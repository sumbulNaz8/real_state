from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.exceptions import RequestValidationError
from contextlib import asynccontextmanager
from starlette.exceptions import HTTPException as StarletteHTTPException
import uvicorn
import os
from dotenv import load_dotenv
import traceback

# Load environment variables first, before importing modules that depend on settings
load_dotenv()

# Import settings after environment is loaded
from core.config import settings

# Import routers
from api.v1.routers import auth, users, builders, projects, inventory, investors, bookings, customers, payments, installments, transfers, reports
from api.v1.routers.dev_auth import router as dev_auth_router
# Import other modules after settings are loaded
from core.security import pwd_context
from utils.logger import logger
from middleware.logging_middleware import LoggingMiddleware
from exceptions import *
from core.database import Base, init_database
from core.database import engine as db_engine
from models.user import User
from sqlalchemy import select, insert

# Initialize FastAPI app
app = FastAPI(
    title="Kings Builder Real Estate Management System",
    description="Complete backend for managing real estate properties in Karachi market",
    version="1.0.0",
    # Comment out lifespan to bypass startup issues
    # lifespan=lifespan
)

# Add custom middleware
app.add_middleware(LoggingMiddleware)

# Add CORS middleware with logging
logger.info(f"CORS Origins configured: {settings.BACKEND_CORS_ORIGINS}")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS if settings.BACKEND_CORS_ORIGINS else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    # Expose custom headers
    expose_headers=["Access-Control-Allow-Origin", "Authorization"]
)

# Exception handlers
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request, exc):
    logger.error(f"HTTP Exception: {exc.status_code} - {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
            "message": f"HTTP {exc.status_code} error occurred"
        }
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    logger.error(f"Validation Error: {exc}")
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "error": "Validation error",
            "message": "Request validation failed",
            "details": exc.errors()
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    logger.error(f"General Exception: {str(exc)}\n{traceback.format_exc()}")
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "Internal server error",
            "message": "An unexpected error occurred"
        }
    )

# Custom exception handlers for business logic
@app.exception_handler(BuilderLimitExceededException)
async def handle_builder_limit_exception(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
            "message": "Builder project limit exceeded"
        }
    )

@app.exception_handler(InvestorConsentRequiredException)
async def handle_investor_consent_exception(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
            "message": "Investor consent required"
        }
    )

@app.exception_handler(HoldExpiredException)
async def handle_hold_expired_exception(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
            "message": "Hold period expired"
        }
    )

@app.exception_handler(InvalidStatusTransitionException)
async def handle_invalid_status_transition_exception(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
            "message": "Invalid status transition"
        }
    )

@app.exception_handler(DoubleBookingException)
async def handle_double_booking_exception(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
            "message": "Double booking attempt"
        }
    )

# Include API routes
logger.info("Registering authentication routes...")
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
logger.info("Auth router registered at /api/v1/auth")

app.include_router(dev_auth_router, prefix="/api/v1/dev-auth", tags=["Development Authentication"])
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(builders.router, prefix="/api/v1/builders", tags=["Builders"])
app.include_router(projects.router, prefix="/api/v1/projects", tags=["Projects"])
app.include_router(inventory.router, prefix="/api/v1/inventory", tags=["Inventory"])
app.include_router(investors.router, prefix="/api/v1/investors", tags=["Investors"])
app.include_router(bookings.router, prefix="/api/v1/bookings", tags=["Bookings"])
app.include_router(customers.router, prefix="/api/v1/customers", tags=["Customers"])
app.include_router(payments.router, prefix="/api/v1/payments", tags=["Payments"])
app.include_router(installments.router, prefix="/api/v1/installments", tags=["Installments"])
app.include_router(transfers.router, prefix="/api/v1/transfers", tags=["Transfers"])
app.include_router(reports.router, prefix="/api/v1/reports", tags=["Reports"])

# Log registered routes for debugging
logger.info("Registered routes:")
for route in app.routes:
    if hasattr(route, 'methods') and hasattr(route, 'path'):
        logger.info(f"  {route.methods} {route.path}")

@app.get("/")
async def root():
    """Root endpoint - redirects to API documentation"""
    return RedirectResponse(url="/docs")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Kings Builder Backend"}

@app.get("/debug/routes")
async def debug_routes():
    """Debug endpoint to list all registered routes"""
    routes_info = []
    for route in app.routes:
        if hasattr(route, 'methods') and hasattr(route, 'path'):
            routes_info.append({
                "methods": list(route.methods),
                "path": route.path
            })
    return {"routes": routes_info}

if __name__ == "__main__":
    uvicorn.run(
        "main_minimal:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )