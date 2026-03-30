from typing import Union
from fastapi import FastAPI,UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/upload_file")
async def upload_file(file: UploadFile = File(...)):
    return {
        "filename": file.filename,
        "content_type": file.content_type
    }

class Item(BaseModel):  # //body
    name:str
    price:float
    is_offer:Union[bool,None]=None

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.post("/items/{item_id}")
def create_items(item_id:int,item:Item):
    return {"items_name":item.name,"item_id":item_id}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id,"q": q}
