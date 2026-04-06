from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, HTTPException
from src.utils.jwt import decodeJWT

class JWTMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # skip public routes
        # if request.url.path in ["/api/user"]: //exception urls
        if request.url.path.startswith("/api"):
            return await call_next(request)
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Missing token")
        token = auth_header.split(" ")[1]
        payload = decodeJWT(token)
        if not payload:
            raise HTTPException(status_code=401, detail="Invalid token")
        request.user = payload
        return await call_next(request)