import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    PROJECT_NAME: str = "Aegis Banking Intelligence API"
    VERSION: str = "4.2.0"
    API_V1_STR: str = "/api/v1"
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "aegis_super_secret_enterprise_banking_key_2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    # Database URL (SQLite fallback for local dev if Postgres is not configured)
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", "sqlite:///./aegis_banking.db"
    )
    
    # Gemini API Key for Multi-Agent Copilot
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

    class Config:
        case_sensitive = True

settings = Settings()
