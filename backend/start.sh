#!/bin/bash

# Kings Builder Backend Startup Script

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
elif [ -d ".venv" ]; then
    source .venv/bin/activate
fi

# Install dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
fi

# Run database migrations
alembic upgrade head

# Start the FastAPI application
uvicorn main:app --host 0.0.0.0 --port 8000 --reload