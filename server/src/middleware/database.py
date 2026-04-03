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
            passw  TEXT,
            email TEXT UNIQUE NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS chats (
            id SERIAL PRIMARY KEY,
            system_message TEXT NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
                       
        CREATE TABLE IF NOT EXISTS messages (
            id SERIAL PRIMARY KEY,
            chat_id INTEGER REFERENCES chats(id) ON DELETE CASCADE,
            role SMALLINT NOT NULL, -- 0=user, 1=assistant
            content TEXT NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
        
    """)
    await conn.close()
    print("Tables created.")