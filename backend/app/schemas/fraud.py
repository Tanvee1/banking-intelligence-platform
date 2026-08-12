from pydantic import BaseModel
from typing import List, Optional

class FraudCaseResponse(BaseModel):
    id: str
    risk: str
    riskScore: int
    status: str
    timestamp: str
    amount: str
    transactionId: str
    channel: str
    location: str
    ipAddress: str
    customer: dict
    merchant: dict
    riskFactors: List[dict]
