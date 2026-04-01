from typing import Union, List, Literal
from fastapi import FastAPI,UploadFile, HTTPException
from pydantic import BaseModel
from fastapi.concurrency import run_in_threadpool
from src.middleware.cors import setup_cors
from src.utils.fileType import EXTRACTORS
from src.service.api import AIChatApi
from src.router.apiExtractText import router as apiExtract
from src.router.apiAiChat import router as apiAiChat
from src.router.apiURLDow import router as apiURLDow


app = FastAPI()

setup_cors(app)

app.include_router(apiExtract)
app.include_router(apiAiChat)
app.include_router(apiURLDow)

# @app.get("/")
# async def read_root():
#     return {"Hello": "World"}
