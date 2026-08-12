import sys
import os
from app.db.session import engine, Base, SessionLocal
from app.db.models import UserModel, CustomerModel, FraudAlertModel, TimeSeriesModel, AuditLogModel
from app.core.security import get_password_hash

def init_db():
    print("Initializing database tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Check if users exist
        if not db.query(UserModel).first():
            print("Seeding initial user persona accounts...")
            users = [
                UserModel(
                    id="usr_rm",
                    email="rm@aegis.com",
                    hashed_password=get_password_hash("password123"),
                    name="Rohan Deshmukh",
                    role="relationship_manager",
                    avatar_initials="RD",
                ),
                UserModel(
                    id="usr_analyst",
                    email="analyst@aegis.com",
                    hashed_password=get_password_hash("password123"),
                    name="Sarah Jenkins",
                    role="fraud_analyst",
                    avatar_initials="SJ",
                ),
                UserModel(
                    id="usr_admin",
                    email="admin@aegis.com",
                    hashed_password=get_password_hash("password123"),
                    name="Enterprise Admin",
                    role="admin",
                    avatar_initials="EA",
                ),
            ]
            db.add_all(users)

        # Check if customers exist
        if not db.query(CustomerModel).first():
            print("Seeding customer portfolio telemetry...")
            customers = [
                CustomerModel(
                    id="CUST-40921",
                    name="Maya Iyer",
                    tier="Ultra High Net Worth (UHNW)",
                    aum_amount=18400000.0,
                    aum_display="₹18.4 Crore ($2.2M USD)",
                    churn_risk_score=92,
                    relationship_manager="Rohan Deshmukh",
                    account_opened="12 March 2018",
                    summary="High net-worth relationship exhibiting elevated deposit flight risk following wire fee dispute #8849. Action recommended within 48 hours.",
                ),
                CustomerModel(
                    id="CUST-88391",
                    name="Karan Mehta",
                    tier="Corporate Treasury",
                    aum_amount=240000000.0,
                    aum_display="₹24.0 Crore ($28.8M USD)",
                    churn_risk_score=45,
                    relationship_manager="Rohan Deshmukh",
                    account_opened="04 January 2015",
                    summary="Corporate treasury account manager. Active SWIFT wire telemetry monitored under high-volume limits.",
                ),
                CustomerModel(
                    id="CUST-38104",
                    name="Arjun Sharma",
                    tier="Private Banking",
                    aum_amount=42100000.0,
                    aum_display="₹4.21 Crore ($5.0M USD)",
                    churn_risk_score=38,
                    relationship_manager="Rohan Deshmukh",
                    account_opened="19 November 2020",
                    summary="Private banking client with international travel notices and routine high-value card authorizations.",
                ),
            ]
            db.add_all(customers)

        # Check if fraud alerts exist
        if not db.query(FraudAlertModel).first():
            print("Seeding fraud intercept cases...")
            alerts = [
                FraudAlertModel(
                    id="CASE-8942-TXN",
                    customer_id="CUST-40921",
                    customer_name="Maya Iyer",
                    amount="₹4,20,000",
                    raw_amount=420000.0,
                    merchant="LuxPay Global Exch (Dubai, UAE)",
                    device_ip="185.220.101.5",
                    is_tor=True,
                    risk_level="High",
                    risk_score=94,
                    status="Under Review",
                    time_label="2 mins ago",
                    timestamp="2026-08-09 11:42:08 UTC",
                    ai_summary="Velocity anomaly: 1,920 km in 42 mins from Mumbai session. Tor exit node in Dubai.",
                ),
                FraudAlertModel(
                    id="CASE-8945-TXN",
                    customer_id="CUST-88391",
                    customer_name="Karan Mehta",
                    amount="₹1,25,00,000",
                    raw_amount=12500000.0,
                    merchant="Apex Offshore LLC (Cayman Islands)",
                    device_ip="103.224.180.12",
                    is_tor=True,
                    risk_level="Critical",
                    risk_score=99,
                    status="Escalated",
                    time_label="3 mins ago",
                    timestamp="2026-08-09 11:41:00 UTC",
                    ai_summary="High-value SWIFT international wire targeting Cayman Islands shell entity via RDP hijack.",
                ),
            ]
            db.add_all(alerts)

        # Check if time series points exist
        if not db.query(TimeSeriesModel).first():
            print("Seeding time-series portfolio telemetry...")
            ts_points = [
                TimeSeriesModel(customer_id="CUST-40921", month="Jan 2026", aum_value=24.1, outflow_value=0.5, event_category=None),
                TimeSeriesModel(customer_id="CUST-40921", month="Feb 2026", aum_value=23.8, outflow_value=0.8, event_category=None),
                TimeSeriesModel(customer_id="CUST-40921", month="Mar 2026", aum_value=23.5, outflow_value=1.2, event_category="macro", event_label="RBI +0.5% Rate Hike", event_impact="External yield gap opened"),
                TimeSeriesModel(customer_id="CUST-40921", month="Apr 2026", aum_value=22.9, outflow_value=1.8, event_category=None),
                TimeSeriesModel(customer_id="CUST-40921", month="May 2026", aum_value=22.1, outflow_value=2.4, event_category="competitor", event_label="WealthFirm 8.25% Offer", event_impact="Competitor targeted Maya"),
                TimeSeriesModel(customer_id="CUST-40921", month="Jun 2026", aum_value=21.0, outflow_value=3.5, event_category="dispute", event_label="Wire Fee Dispute #8849", event_impact="₹2,500 fee friction ticket"),
                TimeSeriesModel(customer_id="CUST-40921", month="Jul 2026", aum_value=19.8, outflow_value=4.2, event_category=None),
                TimeSeriesModel(customer_id="CUST-40921", month="Aug 2026", aum_value=18.4, outflow_value=4.5, event_category="dispute", event_label="92% Churn Risk Peak", event_impact="Action required within 48h"),
            ]
            db.add_all(ts_points)

        db.commit()
        print("Database initialization complete!")
    except Exception as e:
        db.rollback()
        print(f"Error during db initialization: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
