from pydantic import BaseModel
from typing import List, Optional

class TimeSeriesPoint(BaseModel):
    month: str
    aum: float
    outflow: float
    eventCategory: Optional[str] = None
    eventLabel: Optional[str] = None
    eventImpact: Optional[str] = None

class TimeSeriesResponse(BaseModel):
    customerId: str
    points: List[TimeSeriesPoint]
    netOutflow12m: str
    primaryEventDrivers: List[str]
    forecastTrajectory: str
