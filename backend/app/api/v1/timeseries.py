from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import TimeSeriesModel
from app.schemas.timeseries import TimeSeriesResponse, TimeSeriesPoint

router = APIRouter(prefix="/timeseries", tags=["Time-Series Telemetry"])

@router.get("/{customer_id}", response_model=TimeSeriesResponse)
def get_customer_timeseries(customer_id: str, db: Session = Depends(get_db)):
    points_db = db.query(TimeSeriesModel).filter(TimeSeriesModel.customer_id == customer_id).order_by(TimeSeriesModel.id).all()
    
    if points_db:
        pts = [
            TimeSeriesPoint(
                month=p.month,
                aum=p.aum_value,
                outflow=p.outflow_value,
                eventCategory=p.event_category,
                eventLabel=p.event_label,
                eventImpact=p.event_impact,
            )
            for p in points_db
        ]
        return TimeSeriesResponse(
            customerId=customer_id,
            points=pts,
            netOutflow12m="-₹5.7M",
            primaryEventDrivers=[
                "RBI +0.5% Rate Hike (Mar 2026)",
                "Competitor 8.25% Offer (May 2026)",
                "Wire Fee Dispute Ticket #8849 (Jun 2026)",
            ],
            forecastTrajectory="High Outflow Acceleration without Rate Bonus Intervention",
        )

    # Default fallback data
    return TimeSeriesResponse(
        customerId=customer_id,
        points=[
            TimeSeriesPoint(month="Jan 2026", aum=24.1, outflow=0.5),
            TimeSeriesPoint(month="Mar 2026", aum=23.5, outflow=1.2, eventCategory="macro", eventLabel="RBI Rate Hike", eventImpact="External yield gap opened"),
            TimeSeriesPoint(month="Jun 2026", aum=21.0, outflow=3.5, eventCategory="dispute", eventLabel="Wire Fee Dispute #8849", eventImpact="₹2,500 fee friction ticket"),
            TimeSeriesPoint(month="Aug 2026", aum=18.4, outflow=4.5, eventCategory="dispute", eventLabel="92% Churn Risk Peak", eventImpact="Action required within 48h"),
        ],
        netOutflow12m="-₹5.7M",
        primaryEventDrivers=["RBI Rate Hike", "Competitor Yield Offer", "Wire Fee Dispute #8849"],
        forecastTrajectory="High Outflow Acceleration without Rate Bonus Intervention",
    )
