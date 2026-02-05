from pydantic import BaseModel, validator
from typing import Optional
from datetime import datetime
import uuid
from schemas.base import BaseSchema

class BuilderBase(BaseModel):
    name: str
    registration_number: Optional[str] = None
    contact_person: Optional[str] = None
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    logo_url: Optional[str] = None
    max_projects: Optional[int] = 10

    @validator('contact_email')
    def validate_email(cls, v):
        if v and '@' not in v:
            raise ValueError('Invalid email format')
        return v

class BuilderCreate(BuilderBase):
    pass

class BuilderUpdate(BaseModel):
    name: Optional[str] = None
    registration_number: Optional[str] = None
    contact_person: Optional[str] = None
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    logo_url: Optional[str] = None
    max_projects: Optional[int] = None
    status: Optional[str] = None

class BuilderInDB(BuilderBase, BaseSchema):
    status: str = "active"
    created_by_id: Optional[uuid.UUID] = None
    updated_by_id: Optional[uuid.UUID] = None

class BuilderPublic(BaseSchema):
    name: str
    registration_number: Optional[str]
    contact_person: Optional[str]
    contact_email: Optional[str]
    contact_phone: Optional[str]
    address: Optional[str]
    city: Optional[str]
    country: Optional[str]
    logo_url: Optional[str]
    max_projects: int
    status: str