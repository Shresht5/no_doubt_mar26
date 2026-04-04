import os
from src.middleware.dotenv import loadDotenv
from fastapi import  HTTPException
import httpx

loadDotenv()
LLM_MODEL = os.getenv("LLM_MODEL")
LLM_URL = os.getenv("LLM_URL")
LLM_API_KEY = os.getenv("LLM_API_KEY")

async def AIChatApi(req):
    
    url = f"{LLM_URL}"
    payload = {
        "model": f"{LLM_MODEL}",
        "messages": [message.dict() for message in req.messages],
    }
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {LLM_API_KEY}",
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
        res = await client.post(url, json=payload, headers=headers)

    if res.status_code != 200:
        raise HTTPException(status_code=res.status_code, detail=res.text)
    return res.json()