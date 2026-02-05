from pydantic import BaseModel
from typing import Generic, TypeVar, Optional, List, Dict, Any
from datetime import datetime
import uuid

T = TypeVar('T')

class APIResponse(BaseModel):
    """Standard API response format."""
    success: bool
    message: str
    data: Optional[Any] = None
    error: Optional[str] = None

class PaginatedResponse(BaseModel):
    """Paginated response format."""
    success: bool
    message: str
    data: List[Any]
    pagination: dict

    class Config:
        from_attributes = True

class TokenResponse(APIResponse):
    """Token response format."""
    data: Optional[dict] = None

class UserResponse(APIResponse):
    """User response format."""
    data: Optional[dict] = None

class BuilderResponse(APIResponse):
    """Builder response format."""
    data: Optional[dict] = None

class ProjectResponse(APIResponse):
    """Project response format."""
    data: Optional[dict] = None

class InventoryResponse(APIResponse):
    """Inventory response format."""
    data: Optional[dict] = None

class BookingResponse(APIResponse):
    """Booking response format."""
    data: Optional[dict] = None

class PaymentResponse(APIResponse):
    """Payment response format."""
    data: Optional[dict] = None

class ReportResponse(APIResponse):
    """Report response format."""
    data: Optional[Dict[str, Any]] = None