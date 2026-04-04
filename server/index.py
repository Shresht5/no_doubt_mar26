from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.middleware.cors import setup_cors
from src.middleware.session import add_session_middleware
from src.router.apiExtractText import router as apiExtract
from src.router.apiAiMessage import router as apiAiMessage
from src.router.apiURLDow import router as apiURLDow
from src.router.apiLogin import router as apiLogin
from src.router.apiUsers import router as apiUser
from src.router.apiChat import router as apiChat
# from src.router.api import router as apiMessage
from src.middleware.database import create_pool, close_pool,dbinit

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_pool()   
    await dbinit()
    yield                
    await close_pool()   

app = FastAPI(lifespan=lifespan)  

setup_cors(app)
add_session_middleware(app)

app.include_router(apiExtract)
app.include_router(apiAiMessage)
app.include_router(apiURLDow)
app.include_router(apiLogin)
app.include_router(apiUser)
app.include_router(apiChat)