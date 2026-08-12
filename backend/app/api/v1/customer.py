from fastapi import APIRouter
from typing import List
from app.schemas.customer import CustomerResponse

router = APIRouter(prefix="/customers", tags=["Customer Intelligence"])

sample_customers = [
    {
        "id": "CUST-40921",
        "name": "Maya Iyer",
        "tier": "Ultra High Net Worth (UHNW)",
        "aum": "₹18.4 Crore ($2.2M USD)",
        "churnRisk": 92,
        "relationshipManager": "Rohan Deshmukh",
        "accountOpened": "12 March 2018",
        "summary": "High net-worth relationship exhibiting elevated deposit flight risk following wire fee dispute #8849. Action recommended within 48 hours.",
        "metrics": [
            {"label": "Managed Portfolio AUM", "value": "₹18.4M", "change": "-₹5.7M (12M)"},
            {"label": "Predicted Churn Score", "value": "92%", "change": "+14% vs Last Q", "color": "text-red-400"},
            {"label": "Active Products", "value": "6 Holding Accounts", "change": "FD, Wealth, Forex"},
            {"label": "Open Service Tickets", "value": "1 Critical Escalation", "change": "Ticket #8849"},
        ],
        "nextActions": [
            {"id": "a1", "title": "Offer Rate Bonus (+0.75% FD)", "type": "retention", "priority": "High"},
            {"id": "a2", "title": "Schedule Executive Retention Call", "type": "outreach", "priority": "Urgent"},
        ],
    }
]

@router.get("", response_model=List[CustomerResponse])
def get_customers():
    return sample_customers

@router.get("/{customer_id}", response_model=CustomerResponse)
def get_customer_by_id(customer_id: str):
    for c in sample_customers:
        if c["id"] == customer_id:
            return c
    return sample_customers[0]
