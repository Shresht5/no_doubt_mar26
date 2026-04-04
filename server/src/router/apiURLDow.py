from fastapi import APIRouter
import yt_dlp
import tempfile
import os
from src.service.extractText import extract_audio

router=APIRouter(prefix="/api/urldow",tags=["URL"])

@router.get("/audiototext")
def download_video(url: str):
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp_path = tmp.name

    ydl_opts = {
        "format": "worstaudio/worst",
        "outtmpl": tmp_path + ".%(ext)s",
        "quiet": True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            ext = info.get("ext", "webm")
            title = info.get("title", "unknown")        
            duration = info.get("duration", 0)  

        actual_path = f"{tmp_path}.{ext}"

        with open(actual_path, "rb") as f:
            audio_bytes = f.read()

        text = extract_audio(audio_bytes, suffix=f".{ext}")
        return { "filename": f"{title}.{ext}",             
            "characters": len(text),                
            "text": text } 

    finally:
        for path in [tmp_path, f"{tmp_path}.{ext}"]:
            if os.path.exists(path):
                os.remove(path)



@router.get("/audiodow")
def download_video(url: str):
    ydl_opts = {
        "format": "worstaudio/worst",   
        "outtmpl": "downloads/%(title)s.%(ext)s",
        "quiet": True,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

    return {"status": "downloaded"}

