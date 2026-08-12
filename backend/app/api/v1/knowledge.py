from fastapi import APIRouter, UploadFile, File, HTTPException, status
from app.schemas.knowledge import PDFUploadResponse, RAGQueryRequest, RAGQueryResponse
from app.agents.tools.compliance_tool import compliance_rag_tool

router = APIRouter(prefix="/knowledge", tags=["Knowledge Base & RAG Index"])

@router.post("/upload-pdf", response_model=PDFUploadResponse)
async def upload_regulatory_pdf(file: UploadFile = File(...)):
    """
    Uploads a new regulatory PDF, parses text using PyMuPDF (fitz), chunks it into 500-char segments,
    computes SentenceTransformer embeddings, and inserts vectors into FAISS in real time.
    """
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF documents (.pdf) can be indexed into the FAISS vector database.",
        )

    try:
        file_bytes = await file.read()
        res = compliance_rag_tool.add_pdf_document(file_bytes, file.filename)
        return PDFUploadResponse(
            filename=res["filename"],
            chunkCount=res["chunkCount"],
            vectorCount=res["vectorCount"],
            status="Indexed" if res["success"] else "Failed",
            message=res["message"],
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process PDF upload: {str(e)}",
        )

@router.post("/search", response_model=RAGQueryResponse)
def search_knowledge_base(req: RAGQueryRequest):
    """
    Executes FAISS vector search across all indexed regulatory PDFs.
    """
    res = compliance_rag_tool.search_regulatory_sops(req.query, top_k=req.topK or 3)
    return RAGQueryResponse(
        query=req.query,
        results=res.get("retrievedSOPs", []),
        pipeline=res.get("pipeline", "FAISS Vector Search"),
    )
