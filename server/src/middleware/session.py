from starlette.middleware.sessions import SessionMiddleware
import os

def add_session_middleware(app):
    app.add_middleware(
        SessionMiddleware,
        secret_key=os.getenv("SECRET_KEY")
    )