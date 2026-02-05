from pydantic import BaseModel
from typing import Optional
import uuid
from schemas.base import BaseSchema

class PhaseBlockBase(BaseModel):
    name: str
    description: Optional[str] = None
    total_units: Optional[int] = None
    project_id: uuid.UUID

class PhaseBlockCreate(PhaseBlockBase):
    name: str
    project_id: uuid.UUID

class PhaseBlockUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    total_units: Optional[int] = None
    status: Optional[str] = None

class PhaseBlockInDB(PhaseBlockBase, BaseSchema):
    status: str = "active"
    created_by_id: Optional[uuid.UUID] = None
    updated_by_id: Optional[uuid.UUID] = None

class PhaseBlockPublic(BaseSchema):
    name: str
    description: Optional[str]
    total_units: Optional[int]
    status: str
    project_id: uuid.UUID