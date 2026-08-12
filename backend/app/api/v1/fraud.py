from fastapi import APIRouter
from typing import List
from app.schemas.fraud import FraudCaseResponse

router = APIRouter(prefix="/fraud", tags=["Fraud Intelligence"])

sample_cases = [
    {
        "id": "CASE-8945-TXN",
        "risk": "Critical",
        "riskScore": 99,
        "status": "Held",
        "timestamp": "Today, 14:22 UTC",
        "amount": "₹1,25,00,000 ($150k USD)",
        "transactionId": "TXN-9948102-SWIFT",
        "channel": "Corporate SWIFT Wire",
        "location": "George Town, Cayman Islands",
        "ipAddress": "185.220.101.4 (Tor Exit Node)",
        "customer": {"id": "CUST-90112", "name": "Karan Mehta (GlobalCorp)", "segment": "Corporate Treasury"},
        "merchant": {"name": "Apex Offshore Holdings LLC", "mcc": "6211 (Security Brokers)", "country": "KY"},
        "riskFactors": [
            {"label": "Windows RDP Compromise", "severity": "High"},
            {"label": "Bypassed Dual Authorization", "severity": "Critical"},
        ],
    }
]

@router.get("/cases", response_model=List[FraudCaseResponse])
def get_fraud_cases():
    return sample_cases
