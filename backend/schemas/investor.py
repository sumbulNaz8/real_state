from pydantic import BaseModel, validator
from typing import Optional
import uuid
from schemas.base import BaseSchema

class InvestorBase(BaseModel):
    name: str
    company_name: Optional[str] = None
    cnic: Optional[str] = None
    contact_person: Optional[str] = None
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    builder_id: uuid.UUID

    @validator('cnic')
    def validate_cnic_format(cls, v):
        if v and len(v) != 13:
            raise ValueError('CNIC must be 13 digits')
        return v

class InvestorCreate(InvestorBase):
    name: str
    builder_id: uuid.UUID

class InvestorUpdate(BaseModel):
    name: Optional[str] = None
    company_name: Optional[str] = None
    cnic: Optional[str] = None
    contact_person: Optional[str] = None
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    status: Optional[str] = None

class InvestorInDB(InvestorBase, BaseSchema):
    status: str = "active"
    created_by_id: Optional[uuid.UUID] = None
    updated_by_id: Optional[uuid.UUID] = None

class InvestorPublic(BaseSchema):
    name: str
    company_name: Optional[str]
    cnic: Optional[str]
    contact_person: Optional[str]
    contact_email: Optional[str]
    contact_phone: Optional[str]
    address: Optional[str]
    city: Optional[str]
    country: Optional[str]
    status: str
    builder_id: uuid.UUID