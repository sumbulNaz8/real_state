import sqlite3
import uuid
from core.config import settings
from core.security import pwd_context
import hashlib

def create_admin_user():
    """Create master admin user in the database"""

    # Connect to database
    conn = sqlite3.connect('kings_builder_test.db')
    cursor = conn.cursor()

    # Check if master admin already exists
    cursor.execute("SELECT id FROM users WHERE username = ?", (settings.MASTER_ADMIN_USERNAME,))
    existing_user = cursor.fetchone()

    if existing_user:
        print(f"Master admin '{settings.MASTER_ADMIN_USERNAME}' already exists!")
        conn.close()
        return

    # Hash the password - handle bcrypt issues
    try:
        hashed_password = pwd_context.hash(settings.MASTER_ADMIN_PASSWORD)
    except Exception as e:
        print(f"Bcrypt error: {e}. Using SHA-256 hash for testing only!")
        # For testing purposes - hash the password with SHA-256
        hashed_password = "sha256:" + hashlib.sha256(settings.MASTER_ADMIN_PASSWORD.encode()).hexdigest()

    # Generate UUID for the user
    user_id = str(uuid.uuid4())

    # Insert master admin user
    try:
        cursor.execute("""
        INSERT INTO users (id, username, email, password_hash, first_name, last_name, role, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            user_id,
            settings.MASTER_ADMIN_USERNAME,
            settings.MASTER_ADMIN_EMAIL,
            hashed_password,
            "Master",
            "Admin",
            "master_admin",
            "active"
        ))

        conn.commit()
        print(f"Master admin '{settings.MASTER_ADMIN_USERNAME}' created successfully!")
        print(f"User ID: {user_id}")
    except Exception as e:
        print(f"Error inserting user: {e}")

    conn.close()

if __name__ == "__main__":
    create_admin_user()