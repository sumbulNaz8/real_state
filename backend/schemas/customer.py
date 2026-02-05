from pydantic import BaseModel, EmailStr, validator
from typing import Optional
import uuid
from schemas.base import BaseSchema

class CustomerBase(BaseModel):
    first_name: str
    last_name: str
    father_name: Optional[str] = None
    cnic: Optional[str] = None
    contact_number: str
    alternate_contact: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    occupation: Optional[str] = None

    @validator('cnic')
    def validate_cnic_format(cls, v):
        if v and len(v) != 13:
            raise ValueError('CNIC must be 13 digits')
        return v

    @validator('contact_number')
    def validate_contact_number(cls, v):
        if len(v) < 10:
            raise ValueError('Contact number must be at least 10 digits')
        return v

class CustomerCreate(CustomerBase):
    first_name: str
    last_name: str
    contact_number: str

class CustomerUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    father_name: Optional[str] = None
    cnic: Optional[str] = None
    contact_number: Optional[str] = None
    alternate_contact: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    occupation: Optional[str] = None
    status: Optional[str] = None

class CustomerInDB(CustomerBase, BaseSchema):
    status: str = "active"
    created_by_id: Optional[uuid.UUID] = None
    updated_by_id: Optional[uuid.UUID] = None

class CustomerPublic(BaseSchema):
    first_name: str
    last_name: str
    father_name: Optional[str]
    cnic: Optional[str]
    contact_number: str
    alternate_contact: Optional[str]
    email: Optional[str]
    address: Optional[str]
    city: Optional[str]
    country: Optional[str]
    occupation: Optional[str]
    status: str