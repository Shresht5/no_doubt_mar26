from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MessageCreate(BaseModel):
    content: str
    chat_id :int
    role:int
    created_at: Optional[datetime] = None

class MessageOut(BaseModel):
    id: int
    content: str
    chat_id :int
    role:int
    created_at:datetime