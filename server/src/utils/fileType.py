
from src.service.extractText import (
    extract_pdf, extract_docx, extract_pptx,
    extract_xlsx, extract_csv, extract_txt, extract_html,extract_audio
)

EXTRACTORS = {
    ".pdf":  extract_pdf,
    ".docx": extract_docx,
    ".pptx": extract_pptx,
    ".xlsx": extract_xlsx,
    ".csv":  extract_csv,
    ".txt":  extract_txt,
    ".md":   extract_txt,
    ".html": extract_html,
    ".xml":  extract_html,
    ".mp3":  extract_audio,
    ".wav":  extract_audio,
    ".m4a":  extract_audio,
    ".ogg":  extract_audio,
    ".flac": extract_audio,
}