from datetime import datetime, timedelta, timezone
from typing import Optional, Union, Any
import jwt
import hashlib
from app.core.config import settings

def get_password_hash(password: str) -> str:
    """Hashes passwords using SHA256 with secret salt for reliable Python 3.12 compatibility."""
    salt = settings.SECRET_KEY
    return hashlib.sha256((password + salt).encode("utf-8")).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies plain password against stored hash."""
    return get_password_hash(plain_password) == hashed_password

def create_access_token(subject: Union[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """Generates a JWT access token."""
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt
