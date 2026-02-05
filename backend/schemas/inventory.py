from pydantic import BaseModel, validator
from typing import Optional
from decimal import Decimal
from datetime import datetime
import uuid
from schemas.base import BaseSchema
from models.inventory import InventoryStatus, UnitType, CategoryType

class InventoryBase(BaseModel):
    unit_number: Optional[str] = None
    unit_type: UnitType
    category: Optional[CategoryType] = None
    size: Optional[Decimal] = None
    price: Decimal
    project_id: uuid.UUID
    phase_block_id: Optional[uuid.UUID] = None
    remarks: Optional[str] = None
    investor_locked: Optional[bool] = False
    investor_id: Optional[uuid.UUID] = None

    @validator('price')
    def price_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('Price must be positive')
        return v

class InventoryCreate(InventoryBase):
    unit_type: UnitType
    price: Decimal
    project_id: uuid.UUID

class InventoryUpdate(BaseModel):
    unit_number: Optional[str] = None
    unit_type: Optional[UnitType] = None
    category: Optional[CategoryType] = None
    size: Optional[Decimal] = None
    price: Optional[Decimal] = None
    status: Optional[InventoryStatus] = None
    hold_expiry_date: Optional[datetime] = None
    investor_locked: Optional[bool] = None
    investor_id: Optional[uuid.UUID] = None
    remarks: Optional[str] = None

class InventoryInDB(InventoryBase, BaseSchema):
    status: InventoryStatus = "available"
    hold_expiry_date: Optional[datetime] = None
    booked_by_id: Optional[uuid.UUID] = None
    created_by_id: Optional[uuid.UUID] = None
    updated_by_id: Optional[uuid.UUID] = None

class InventoryPublic(BaseSchema):
    unit_number: Optional[str]
    unit_type: UnitType
    category: Optional[CategoryType]
    size: Optional[Decimal]
    price: Decimal
    status: InventoryStatus
    hold_expiry_date: Optional[datetime]
    investor_locked: bool
    remarks: Optional[str]
    project_id: uuid.UUID
    phase_block_id: Optional[uuid.UUID]
    investor_id: Optional[uuid.UUID]