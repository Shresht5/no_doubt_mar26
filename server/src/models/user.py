from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    picture: Optional[str] = None
    passw: Optional[str] = None

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    picture: Optional[str] = None
    passw: Optional[str] = None
