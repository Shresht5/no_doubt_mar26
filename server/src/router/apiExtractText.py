from fastapi import APIRouter,UploadFile, HTTPException
from fastapi.concurrency import run_in_threadpool
from src.controller.userController import get_users
from src.utils.fileType import EXTRACTORS

router=APIRouter(prefix="/api/extract",tags=["Extract"])

@router.post("/")
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

@router.get("/user")
async def read_users():
    return await get_users()