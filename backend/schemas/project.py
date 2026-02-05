from pydantic import BaseModel
from typing import Optional
from datetime import date
import uuid
from schemas.base import BaseSchema

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    location: Optional[str] = None
    city: Optional[str] = None
    total_units: Optional[int] = None
    start_date: Optional[date] = None
    expected_completion_date: Optional[date] = None
    builder_id: uuid.UUID

class ProjectCreate(ProjectBase):
    name: str
    builder_id: uuid.UUID

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    city: Optional[str] = None
    total_units: Optional[int] = None
    status: Optional[str] = None
    start_date: Optional[date] = None
    expected_completion_date: Optional[date] = None

class ProjectInDB(ProjectBase, BaseSchema):
    status: str = "active"
    created_by_id: Optional[uuid.UUID] = None
    updated_by_id: Optional[uuid.UUID] = None

class ProjectPublic(BaseSchema):
    name: str
    description: Optional[str]
    location: Optional[str]
    city: Optional[str]
    total_units: Optional[int]
    status: str
    start_date: Optional[date]
    expected_completion_date: Optional[date]
    builder_id: uuid.UUID