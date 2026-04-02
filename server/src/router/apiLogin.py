from fastapi import APIRouter,Request
from src.middleware.dotenv import loadDotenv
from authlib.integrations.starlette_client import OAuth
import os
from starlette.responses import RedirectResponse
import json
import urllib.parse

router=APIRouter(prefix="/api/google",tags=["Login"])

loadDotenv()
oauth = OAuth()

oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"}
)

@router.get("/login")
async def login(request: Request):
    redirect_uri = request.url_for("auth_callback")
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get("/auth/callback")
async def auth_callback(request: Request):
    token = await oauth.google.authorize_access_token(request)
    user = token.get("userinfo")
    
    data = urllib.parse.quote(json.dumps({
        "email": user["email"],
        "name": user["name"],
        "picture": user["picture"]
    }))

    return RedirectResponse(
        url=f"http://localhost:3000/auth-success?user={data}"
    )