from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware
from src.middleware.cors import setup_cors
from src.router.apiExtractText import router as apiExtract
from src.router.apiAiChat import router as apiAiChat
from src.router.apiURLDow import router as apiURLDow
from src.router.apiLogin import router as apiLogin

app = FastAPI()

app.add_middleware(
    SessionMiddleware,
    secret_key="super-secret-key"  # change to strong random key
)
setup_cors(app)

app.include_router(apiExtract)
app.include_router(apiAiChat)
app.include_router(apiURLDow)
app.include_router(apiLogin)