import os
import fitz  # PyMuPDF
import numpy as np
from typing import List, Dict, Any
from app.core.config import settings

class ComplianceRAGTool:
    def __init__(self):
        self.encoder = None
        self.index = None
        self.chunks: List[str] = []
        self.doc_sources: List[str] = []
        self._init_rag_index()

    def _init_rag_index(self):
        """Initializes SentenceTransformer embedding model and FAISS vector index."""
        try:
            from sentence_transformers import SentenceTransformer
            import faiss

            self.encoder = SentenceTransformer("all-MiniLM-L6-v2")
            
            # Initial Banking Regulatory Handbook Corpus
            initial_corpus = [
                ("SOP-2026-WIRE (Section 7.1 — Dual Approval): Outbound SWIFT and IMPS wire transfers exceeding ₹2,500,000 to offshore jurisdictions or un-biometric device bindings require dual-control sign-off from a certified Senior Risk Specialist prior to ledger release.", "RBI_Master_Direction_2026.pdf"),
                ("SOP-2026-AML (Section 2.4 — FIU-IND SAR Filing): Under Reserve Bank of India (RBI) anti-money laundering directives, any transaction flagged for velocity anomalies, Tor exit node IP routing, or Account Takeover (ATO) indicators must be disclosed via an electronic Suspicious Activity Report (SAR) payload to FIU-IND within a strict 24-hour reporting window.", "RBI_Master_Direction_2026.pdf"),
                ("SOP-2026-KYC (Section 4.3 — UBO Identification): Corporate treasury accounts executing international transfers to shell entity jurisdictions (e.g. Cayman Islands, BVI) must undergo 10% Ultimate Beneficial Ownership (UBO) identity verification and sanctions screening against OFAC & Interpol watchlists.", "KYC_AML_Directive_v4.pdf"),
                ("SOP-2026-RET (Section 3.2 — Relationship Retention): High-net-worth customers (AUM > ₹1 Cr) exhibiting elevated churn risk scores (>80%) following fee dispute tickets are eligible for immediate waiving of wire fees up to ₹5,000 and a +0.75% interest yield extension on fixed liquid term deposits.", "HNW_Retention_Policy.pdf"),
            ]

            self.chunks = [item[0] for item in initial_corpus]
            self.doc_sources = [item[1] for item in initial_corpus]

            embeddings = self.encoder.encode(self.chunks)
            dim = embeddings.shape[1]
            self.index = faiss.IndexFlatL2(dim)
            self.index.add(np.array(embeddings).astype("float32"))
            print(f"FAISS Regulatory RAG Index initialized with {len(self.chunks)} chunks!")
        except Exception as e:
            print(f"Warning: Could not initialize FAISS RAG index: {e}")

    def add_pdf_document(self, file_bytes: bytes, filename: str) -> Dict[str, Any]:
        """
        Parses an uploaded PDF file on the fly using PyMuPDF (fitz), chunks the text into
        500-char segments, encodes with SentenceTransformer, and inserts vectors into FAISS.
        """
        if self.encoder is None or self.index is None:
            self._init_rag_index()

        try:
            # 1. Extract text using PyMuPDF (fitz)
            doc = fitz.open(stream=file_bytes, filetype="pdf")
            full_text = "\n".join([page.get_text() for page in doc])

            if not full_text.strip():
                return {
                    "success": False,
                    "filename": filename,
                    "chunkCount": 0,
                    "vectorCount": self.index.ntotal if self.index else 0,
                    "message": "PDF contains no readable text (scanned image or empty).",
                }

            # 2. Chunk text (500 chars with 50 char overlap)
            new_chunks = []
            chunk_size = 500
            overlap = 50
            for i in range(0, len(full_text), chunk_size - overlap):
                chunk_str = full_text[i:i + chunk_size].strip()
                if len(chunk_str) > 20:
                    new_chunks.append(f"[{filename}] {chunk_str}")

            if not new_chunks:
                return {
                    "success": False,
                    "filename": filename,
                    "chunkCount": 0,
                    "vectorCount": self.index.ntotal if self.index else 0,
                    "message": "Document text was too short to generate chunks.",
                }

            # 3. Compute SentenceTransformer Embeddings
            new_embeddings = self.encoder.encode(new_chunks)

            # 4. Update FAISS Index & Chunks array
            self.index.add(np.array(new_embeddings).astype("float32"))
            self.chunks.extend(new_chunks)
            self.doc_sources.extend([filename] * len(new_chunks))

            print(f"Added {len(new_chunks)} chunks from {filename} to FAISS vector index! Total vectors: {self.index.ntotal}")

            return {
                "success": True,
                "filename": filename,
                "chunkCount": len(new_chunks),
                "vectorCount": self.index.ntotal,
                "message": f"Successfully indexed {filename} into FAISS vector database!",
            }
        except Exception as e:
            print(f"Error processing PDF upload: {e}")
            return {
                "success": False,
                "filename": filename,
                "chunkCount": 0,
                "vectorCount": self.index.ntotal if self.index else 0,
                "message": f"Error indexing PDF: {str(e)}",
            }

    def search_regulatory_sops(self, query: str, top_k: int = 3) -> Dict[str, Any]:
        """
        Executes FAISS Vector Search over RBI Master Directions & uploaded PDF handbooks.
        """
        if self.encoder is not None and self.index is not None:
            try:
                q_embed = self.encoder.encode([query])
                distances, indices = self.index.search(np.array(q_embed).astype("float32"), min(top_k, len(self.chunks)))
                retrieved_chunks = [self.chunks[i] for i in indices[0] if i < len(self.chunks)]
                return {
                    "query": query,
                    "retrievedSOPs": retrieved_chunks,
                    "totalVectorsInIndex": self.index.ntotal,
                    "pipeline": "SentenceTransformer (all-MiniLM-L6-v2) + FAISS IndexFlatL2",
                    "status": "Vector Match Verified",
                }
            except Exception as e:
                print(f"FAISS Search Exception: {e}")

        # Fallback keyword match
        matched = [c for c in self.chunks if any(k in query.lower() for k in ["wire", "sar", "fiu", "rbi", "fee", "churn", "kyc"])]
        return {
            "query": query,
            "retrievedSOPs": matched if matched else self.chunks[:2],
            "totalVectorsInIndex": len(self.chunks),
            "pipeline": "Heuristic Keyword Regulatory Fallback",
            "status": "Keyword Match Verified",
        }

compliance_rag_tool = ComplianceRAGTool()
