from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ChatCreate(BaseModel):
    system_message: str
    user_id :int
    created_at: Optional[datetime] = None
 
class ChatOut(BaseModel):
    id: int
    system_message: str
    user_id :int
    created_at:datetime