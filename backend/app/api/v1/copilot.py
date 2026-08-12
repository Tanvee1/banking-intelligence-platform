from fastapi import APIRouter
from app.schemas.copilot import CopilotQueryRequest, CopilotQueryResponse
from app.agents.langgraph_orchestrator import langgraph_orchestrator

router = APIRouter(prefix="/copilot", tags=["AI Copilot Multi-Agent Orchestrator"])

@router.post("/query", response_model=CopilotQueryResponse)
def query_copilot(req: CopilotQueryRequest):
    result = langgraph_orchestrator.process_query(req.query, req.domainFilter or "all")
    return result

