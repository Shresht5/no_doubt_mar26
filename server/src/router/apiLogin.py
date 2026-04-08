from fastapi import APIRouter,Request
from src.middleware.dotenv import loadDotenv
from authlib.integrations.starlette_client import OAuth
import os
from starlette.responses import RedirectResponse
import json
import urllib.parse
from src.middleware.database import get_conn
from src.utils.jwt import encodeJWT


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
    
    async with get_conn() as conn:
        row = await conn.fetchrow(
            "SELECT id, name, email, picture FROM users WHERE email=$1",
            user["email"]
        )

        if not row:
            row = await conn.fetchrow(
                """INSERT INTO users (name, email, picture, passw)
                   VALUES ($1, $2, $3, $4)
                   RETURNING id, name, email, picture""",
                user["name"],
                user["email"],
                user["picture"],
                None  
            )

    db_user = dict(row)

    jwt_token = encodeJWT(db_user["email"], db_user["id"])

    return RedirectResponse(
    url=f"http://localhost:3000/auth-success?"
        f"token={jwt_token}&user={urllib.parse.quote(json.dumps({
            'id': db_user['id'],
            'name': db_user['name'],
            'email': db_user['email'],
            'picture': db_user['picture']
        }))}"
)




    # data = urllib.parse.quote(json.dumps({
    #     "email": user["email"],
    #     "name": user["name"],
    #     "picture": user["picture"]
    # }))

    # return RedirectResponse(
    #     url=f"http://localhost:3000/auth-success?user={data}"
    # )