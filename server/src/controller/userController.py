async def get_users():
    # business logic
    return {"users": ["Alice", "Bob","pop"]}

async def create_user(user):
    # logic like DB insert
    return {"message": "User created", "user": user}