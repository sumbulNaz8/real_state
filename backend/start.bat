@echo off
REM Kings Builder Backend Startup Script for Windows

REM Activate virtual environment if it exists
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
) else if exist ".venv\Scripts\activate.bat" (
    call .venv\Scripts\activate.bat
)

REM Install dependencies if requirements.txt exists
if exist "requirements.txt" (
    pip install -r requirements.txt
)

REM Run database migrations
alembic upgrade head

REM Start the FastAPI application
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

pause