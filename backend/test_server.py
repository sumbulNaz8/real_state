from fastapi import FastAPI, Form, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from core.security import create_access_token, create_refresh_token
from datetime import timedelta
from core.config import settings
from schemas.responses import TokenResponse

app = FastAPI(title="Test Auth Server")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    # Expose custom headers
    expose_headers=["Access-Control-Allow-Origin", "Authorization"]
)

@app.post("/api/v1/auth/login", response_model=TokenResponse)
async def test_login(
    username: str = Form(...),
    password: str = Form(...)
):
    """
    Test login endpoint that bypasses database and verifies hardcoded credentials
    """
    # Hardcoded test credentials
    VALID_USERNAME = "scitforte"
    VALID_PASSWORD = "Pass2026"

    if username != VALID_USERNAME or password != VALID_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create tokens
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": username, "role": "master_admin"},
        expires_delta=access_token_expires
    )

    refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    refresh_token = create_refresh_token(
        data={"sub": username, "role": "master_admin"},
        expires_delta=refresh_token_expires
    )

    return TokenResponse(
        success=True,
        message="Login successful",
        data={
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "user": {
                "id": "test-user-id",
                "username": username,
                "email": "admin@scitforte.com",
                "first_name": "Master",
                "last_name": "Admin",
                "role": "master_admin",
                "builder_id": None
            }
        }
    )

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Test Auth Server"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)