from fastapi import APIRouter, HTTPException
from src.middleware.database import get_conn
from src.models.user import UserCreate, UserOut, AuthResponse
from src.utils.jwt import encodeJWT
from src.utils.hashPass import hash_password

router = APIRouter(prefix="/api/user",tags=["Users"])

# CREATE
@router.post("/", response_model=AuthResponse, status_code=201)
async def create_user(payload: UserCreate):
    async with get_conn() as conn:
        row = await conn.fetchrow("SELECT id, name, email, picture, passw FROM users WHERE email=$1", payload.email)
        if not row:
            row = await conn.fetchrow(
                "INSERT INTO users (name, email, picture, passw) VALUES ($1, $2, $3, $4) RETURNING id, name, picture, email,passw",
                payload.name, payload.email, payload.picture, payload.passw
            )
    user = dict(row)

    token = encodeJWT(user["email"], user["id"])

    return {
        "user": user,
        "access_token": token,
        "token_type": "bearer"
    }

# READ ALL
@router.get("/", response_model=list[UserOut])
async def list_users():
    async with get_conn() as conn:
        rows = await conn.fetch("SELECT * FROM users")
    return [dict(r) for r in rows]

# READ ONE
@router.get("/{user_id}", response_model=UserOut)
async def get_user(user_id: int):
    async with get_conn() as conn:
        row = await conn.fetchrow(
            "SELECT * FROM users WHERE id = $1", user_id
        )
    if not row:
        raise HTTPException(status_code=404, detail="User not found")
    return dict(row)

# UPDATE
@router.put("/{user_id}", response_model=UserOut)
async def update_user(user_id: int, payload: UserCreate):
    async with get_conn() as conn:
        row = await conn.fetchrow(
            "UPDATE users SET name=$1, email=$2, picture=$3 WHERE id=$4 RETURNING id, name, picture, email",
            payload.name, payload.email, payload.picture, user_id
        )
    if not row:
        raise HTTPException(status_code=404, detail="User not found")
    return dict(row)

# DELETE
@router.delete("/{user_id}", status_code=204)
async def delete_user(user_id: int):
    async with get_conn() as conn:
        result = await conn.execute("DELETE FROM users WHERE id=$1", user_id)
    if result == "DELETE 0":
        raise HTTPException(status_code=404, detail="User not found")