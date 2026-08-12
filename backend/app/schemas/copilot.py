from pydantic import BaseModel
from typing import List, Optional

class Citation(BaseModel):
    type: str
    label: str
    link: str
    detail: str

class CopilotQueryRequest(BaseModel):
    query: str
    domainFilter: Optional[str] = "all"
    context: Optional[dict] = None

class CopilotQueryResponse(BaseModel):
    markdownText: str
    citations: List[Citation]
    domainsCovered: List[str]
    riskLevel: Optional[str] = "Medium"
