from pydantic import BaseModel, EmailStr
from typing import Optional

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    role: Optional[str] = "relationship_manager"

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict
