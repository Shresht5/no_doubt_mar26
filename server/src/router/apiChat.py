import asyncpg
from fastapi import APIRouter, HTTPException
from src.middleware.database import get_conn
from src.models.chat import ChatCreate, ChatOut

router=APIRouter(prefix="/api/chat",tags=["Chat"])

# CREATE
@router.post("/", response_model=ChatOut, status_code=201)
async def create_chat(payload: ChatCreate):
    async with get_conn() as conn:
        try:
            row = await conn.fetchrow(
                """
                INSERT INTO chats (system_message, user_id)
                VALUES ($1, $2)
                RETURNING id, system_message, user_id, created_at
                """,
                payload.system_message, payload.user_id
            )
        except asyncpg.ForeignKeyViolationError:
            raise HTTPException(status_code=404, detail="User not found")
    return dict(row)

# GET ALL CHATS
@router.get("/", response_model=list[ChatOut])
async def list_chats():
    async with get_conn() as conn:
        rows = await conn.fetch(
            "SELECT id, system_message, user_id, created_at FROM chats"
        )
    return [dict(r) for r in rows]

# GET CHATS BY USER
@router.get("/user/{user_id}", response_model=list[ChatOut])
async def get_user_chats(user_id: int):
    async with get_conn() as conn:
        rows = await conn.fetch(
            "SELECT id, system_message, user_id, created_at FROM chats WHERE user_id = $1",
            user_id
        )
    return [dict(r) for r in rows]

# GET ONE CHAT
@router.get("/{chat_id}", response_model=ChatOut)
async def get_chat(chat_id: int):
    async with get_conn() as conn:
        row = await conn.fetchrow(
            "SELECT id, system_message, user_id, created_at FROM chats WHERE id = $1",
            chat_id
        )
    if not row:
        raise HTTPException(status_code=404, detail="Chat not found")
    return dict(row)

# DELETE
@router.delete("/{chat_id}", status_code=204)
async def delete_chat(chat_id: int):
    async with get_conn() as conn:
        result = await conn.execute("DELETE FROM chats WHERE id = $1", chat_id)
    if result == "DELETE 0":
        raise HTTPException(status_code=404, detail="Chat not found")