from pydantic import BaseModel
from typing import List, Optional

class PDFUploadResponse(BaseModel):
    filename: str
    chunkCount: int
    vectorCount: int
    status: str
    message: str

class RAGQueryRequest(BaseModel):
    query: str
    topK: Optional[int] = 3

class RAGQueryResultItem(BaseModel):
    content: str
    sourceDoc: Optional[str] = "RBI Regulatory Handbook"

class RAGQueryResponse(BaseModel):
    query: str
    results: List[str]
    pipeline: str
