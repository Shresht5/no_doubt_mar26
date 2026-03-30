import os
from src.middleware.dotenv import loadDotenv

def AIChatApi(req):
    loadDotenv()
    LLM_MODEL = os.getenv("LLM_MODEL")
    LLM_URL = os.getenv("LLM_URL")
    LLM_API_KEY = os.getenv("LLM_API_KEY")
    return {
        "model": LLM_MODEL,
        "url": LLM_URL,
        "api_key": LLM_API_KEY,
        "request": req.dict()
    }
