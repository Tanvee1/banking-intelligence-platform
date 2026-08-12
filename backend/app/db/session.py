import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

# Database connection URL (PostgreSQL 15 default, fallback to local SQLite)
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://tanvee@localhost:5432/aegis_db")

try:
    engine = create_engine(DATABASE_URL, pool_pre_ping=True)
    # Test connection
    with engine.connect() as conn:
        pass
except Exception:
    # Fallback to local SQLite if PostgreSQL service is not reachable
    SQLITE_URL = "sqlite:///./aegis.db"
    engine = create_engine(SQLITE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
