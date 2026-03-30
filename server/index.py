from typing import Union
from fastapi import FastAPI,UploadFile, HTTPException
from pydantic import BaseModel
from fastapi.concurrency import run_in_threadpool
from src.middleware.cors import setup_cors
from src.utils.fileType import EXTRACTORS
from src.service.api import AIChatApi

app = FastAPI()

setup_cors(app)

@app.post("/extract")
async def extract_text(file: UploadFile):
    # Get file extension
    ext = "." + file.filename.split(".")[-1].lower()

    extractor = EXTRACTORS.get(ext) 
    if not extractor:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported file type: {ext}"
        )

    # Read file into memory (no temp files)
    data = await file.read()

    # Run sync extractor in thread pool (keeps event loop free)
    text = await run_in_threadpool(extractor, data)

    return {
        "filename": file.filename,
        "characters": len(text),
        "text": text
    }

class Item(BaseModel):  # //body
    name:str
    price:float
    is_offer:Union[bool,None]=None

@app.post("/aichat")
async def ai_chat(req:Item):
    return AIChatApi(req)

# @app.post("/upload_file")
# async def upload_file(file: UploadFile = File(...)):
#     return {
#         "filename": file.filename,
#         "content_type": file.content_type
#     }

# @app.get("/")
# async def read_root():
#     return {"Hello": "World"}

# @app.post("/items/{item_id}")
# def create_items(item_id:int,item:Item):
#     return {"items_name":item.name,"item_id":item_id}

# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id,"q": q}
