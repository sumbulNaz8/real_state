import asyncio
from sqlalchemy import select
from core.database import get_db
from models.user import User
from core.config import settings

async def test_db_connection():
    """Test database connection and user query"""

    print("Testing database connection...")

    try:
        # Get database session
        db_gen = get_db()
        db = await db_gen.__anext__()  # Get the session

        print("Database session created successfully")

        # Test query to find the user
        print(f"Searching for user: {settings.MASTER_ADMIN_USERNAME}")

        result = await db.execute(
            select(User).where(User.username == settings.MASTER_ADMIN_USERNAME)
        )
        user = result.scalar_one_or_none()

        if user:
            print(f"User found: {user.username}")
            print(f"User ID: {user.id}")
            print(f"User role: {user.role}")
            print(f"User status: {user.status}")
            print(f"Password hash (first 20 chars): {user.password_hash[:20] if user.password_hash else 'None'}")
        else:
            print("User not found in database!")

        # Close the session
        await db_gen.aclose()

    except Exception as e:
        print(f"Error testing database: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_db_connection())