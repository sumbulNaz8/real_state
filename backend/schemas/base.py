from pydantic import BaseModel
from datetime import datetime
from typing import Optional
import uuid

class BaseSchema(BaseModel):
    """Base schema with common fields."""
    id: Optional[uuid.UUID] = None
    external_id: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class PaginatedResponse(BaseModel):
    """Schema for paginated responses."""
    data: list
    total: int
    page: int
    limit: int
    pages: int