from pydantic import BaseModel
from typing import List, Optional

class CustomerMetric(BaseModel):
    label: str
    value: str
    change: Optional[str] = None
    color: Optional[str] = None

class CustomerResponse(BaseModel):
    id: str
    name: str
    tier: str
    aum: str
    churnRisk: int
    relationshipManager: str
    accountOpened: str
    summary: str
    metrics: List[CustomerMetric]
    nextActions: List[dict]
