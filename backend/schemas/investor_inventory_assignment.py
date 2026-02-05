from pydantic import BaseModel, validator
from typing import Optional
from decimal import Decimal
import uuid
from schemas.base import BaseSchema

class InvestorInventoryAssignmentBase(BaseModel):
    investor_id: uuid.UUID
    inventory_id: uuid.UUID
    percentage_share: Decimal
    consent_required: Optional[bool] = True

    @validator('percentage_share')
    def validate_percentage(cls, v):
        if v <= 0 or v > 100:
            raise ValueError('Percentage share must be between 0 and 100')
        return v

class InvestorInventoryAssignmentCreate(InvestorInventoryAssignmentBase):
    investor_id: uuid.UUID
    inventory_id: uuid.UUID
    percentage_share: Decimal

class InvestorInventoryAssignmentUpdate(BaseModel):
    percentage_share: Optional[Decimal] = None
    consent_required: Optional[bool] = None
    status: Optional[str] = None

class InvestorInventoryAssignmentInDB(InvestorInventoryAssignmentBase, BaseSchema):
    status: str = "active"
    created_by_id: Optional[uuid.UUID] = None
    updated_by_id: Optional[uuid.UUID] = None

class InvestorInventoryAssignmentPublic(BaseSchema):
    investor_id: uuid.UUID
    inventory_id: uuid.UUID
    percentage_share: Decimal
    consent_required: bool
    status: str