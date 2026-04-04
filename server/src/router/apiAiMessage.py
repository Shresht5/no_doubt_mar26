from pydantic import BaseModel
from typing import List, Literal
from src.service.api import AIChatApi
import asyncpg
from fastapi import APIRouter, HTTPException
from src.middleware.database import get_conn
from src.models.message import MessageCreate, MessageOut


router=APIRouter(prefix="/api/aimessage",tags=["Chat"])

class Message(BaseModel):
    role: Literal["user", "assistant","system"]
    content: str

class ChatRequest(BaseModel):
    chat_id:int
    messages: List[Message]

@router.post("/ai")
async def ai_chat(req:ChatRequest):
    return await AIChatApi(req)


@router.post("/", response_model=MessageOut, status_code=201)
async def create_message(payload: MessageCreate):
    async with get_conn() as conn:
        try:
            row = await conn.fetchrow(
                """
                INSERT INTO messages (chat_id, role, content)
                VALUES ($1, $2, $3)
                RETURNING id, chat_id, role, content, created_at
                """,
                payload.chat_id, payload.role, payload.content
            )
        except asyncpg.ForeignKeyViolationError:
            raise HTTPException(status_code=404, detail="Chat not found")
    return dict(row)

# GET ALL MESSAGES BY CHAT
@router.get("/chat/{chat_id}", response_model=list[MessageOut])
async def get_chat_messages(chat_id: int):
    async with get_conn() as conn:
        rows = await conn.fetch(
            """
            SELECT id, chat_id, role, content, created_at
            FROM messages
            WHERE chat_id = $1
            ORDER BY created_at ASC
            """,
            chat_id
        )
    return [dict(r) for r in rows]

# GET ONE MESSAGE
@router.get("/{message_id}", response_model=MessageOut)
async def get_message(message_id: int):
    async with get_conn() as conn:
        row = await conn.fetchrow(
            "SELECT id, chat_id, role, content, created_at FROM messages WHERE id = $1",
            message_id
        )
    if not row:
        raise HTTPException(status_code=404, detail="Message not found")
    return dict(row)

# DELETE
@router.delete("/{message_id}", status_code=204)
async def delete_message(message_id: int):
    async with get_conn() as conn:
        result = await conn.execute(
            "DELETE FROM messages WHERE id = $1", message_id
        )
    if result == "DELETE 0":
        raise HTTPException(status_code=404, detail="Message not found")