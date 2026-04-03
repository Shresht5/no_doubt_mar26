from fastapi import APIRouter
from pydantic import BaseModel
from typing import Union, List, Literal
from src.service.api import AIChatApi

router=APIRouter(prefix="/api/aichat",tags=["Chat"])

class Message(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

@router.post("/")
async def ai_chat(req:ChatRequest):
    return await AIChatApi(req)