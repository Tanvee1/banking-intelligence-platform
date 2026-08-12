from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.sql import func
from app.db.session import Base

class UserModel(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    role = Column(String, default="relationship_manager")
    avatar_initials = Column(String, default="RM")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class CustomerModel(Base):
    __tablename__ = "customers"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    tier = Column(String, nullable=False)
    aum_amount = Column(Float, default=0.0)
    aum_display = Column(String, nullable=False)
    churn_risk_score = Column(Integer, default=0)
    relationship_manager = Column(String, nullable=False)
    account_opened = Column(String, nullable=False)
    summary = Column(Text, nullable=True)

class FraudAlertModel(Base):
    __tablename__ = "fraud_alerts"

    id = Column(String, primary_key=True, index=True)
    customer_id = Column(String, ForeignKey("customers.id"), nullable=False)
    customer_name = Column(String, nullable=False)
    amount = Column(String, nullable=False)
    raw_amount = Column(Float, default=0.0)
    merchant = Column(String, nullable=False)
    device_ip = Column(String, nullable=False)
    is_tor = Column(Boolean, default=False)
    risk_level = Column(String, default="High")
    risk_score = Column(Integer, default=0)
    status = Column(String, default="Under Review")
    time_label = Column(String, nullable=False)
    timestamp = Column(String, nullable=False)
    ai_summary = Column(Text, nullable=True)

class TimeSeriesModel(Base):
    __tablename__ = "timeseries_points"

    id = Column(Integer, primary_key=True, autoincrement=True)
    customer_id = Column(String, ForeignKey("customers.id"), nullable=False)
    month = Column(String, nullable=False)
    aum_value = Column(Float, nullable=False)
    outflow_value = Column(Float, nullable=False)
    event_category = Column(String, nullable=True) # "macro", "dispute", "competitor", None
    event_label = Column(String, nullable=True)
    event_impact = Column(String, nullable=True)

class AuditLogModel(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    action_name = Column(String, nullable=False)
    user_email = Column(String, nullable=False)
    target_id = Column(String, nullable=False)
    rationale = Column(Text, nullable=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
