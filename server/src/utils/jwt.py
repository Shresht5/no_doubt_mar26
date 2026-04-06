from src.middleware.dotenv import loadDotenv
from datetime import datetime, timezone, timedelta
from jose import jwt, JWTError
import os

loadDotenv()

SECRET_KEY = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 31

def encodeJWT(email: str, id: int) -> str:
    data = {"email": email, "id": id}  
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)  # ❗ fix timedelta
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def decodeJWT(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])  
    except JWTError as err:  
        print("error:", str(err))
        return None