import asyncpg
from contextlib import asynccontextmanager

DATABASE_URL = "postgresql://postgres:ola12345@localhost:5432/nodoubt"

pool: asyncpg.Pool | None = None

async def create_pool():
    global pool
    pool = await asyncpg.create_pool(DATABASE_URL, min_size=2, max_size=10)

async def close_pool():
    global pool
    if pool:
        await pool.close()

@asynccontextmanager
async def get_conn():
    async with pool.acquire() as conn:
        yield conn

async def dbinit():
    conn = await asyncpg.connect(DATABASE_URL)
    await conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id    SERIAL PRIMARY KEY,
            name  TEXT NOT NULL,
            picture  TEXT,
            email TEXT UNIQUE NOT NULL
        );
    """)
    await conn.close()
    print("Tables created.")