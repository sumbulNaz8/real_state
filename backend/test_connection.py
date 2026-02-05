import asyncio
import asyncpg

async def test_connection():
    # Connection string without SSL parameters first
    conn_str = "postgresql+asyncpg://neondb_owner:npg_CGYk4fs2Xmel@ep-hidden-rice-ah2vyh8x-pooler.c-3.us-east-1.aws.neon.tech/neondb"

    # Extract the actual connection string for asyncpg
    # Format: postgresql+asyncpg://user:pass@host:port/database
    actual_conn_str = "postgresql://neondb_owner:npg_CGYk4fs2Xmel@ep-hidden-rice-ah2vyh8x-pooler.c-3.us-east-1.aws.neon.tech:5432/neondb"

    print("Testing connection...")

    try:
        # Try without SSL first
        conn = await asyncpg.connect(
            host='ep-hidden-rice-ah2vyh8x-pooler.c-3.us-east-1.aws.neon.tech',
            port=5432,
            user='neondb_owner',
            password='npg_CGYk4fs2Xmel',
            database='neondb',
            ssl='require'  # This is the correct way for asyncpg
        )

        print("Connected successfully!")

        # Test a simple query
        result = await conn.fetchval('SELECT version();')
        print(f"PostgreSQL version: {result}")

        await conn.close()
        print("Connection closed.")

    except Exception as e:
        print(f"Connection failed: {e}")

        # Try alternative connection with SSL
        try:
            print("\nTrying with ssl='require'...")
            conn = await asyncpg.connect(
                host='ep-hidden-rice-ah2vyh8x-pooler.c-3.us-east-1.aws.neon.tech',
                port=5432,
                user='neondb_owner',
                password='npg_CGYk4fs2Xmel',
                database='neondb',
                ssl='require'
            )

            print("Connected successfully with SSL!")
            await conn.close()
            print("Connection closed.")
        except Exception as e2:
            print(f"SSL connection also failed: {e2}")

if __name__ == "__main__":
    asyncio.run(test_connection())