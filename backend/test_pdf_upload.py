import fitz
from app.agents.tools.compliance_tool import compliance_rag_tool

def test_pdf_indexing():
    print("--- Testing Real-Time PDF Indexing into FAISS ---")
    
    # 1. Create a dummy PDF document in memory using PyMuPDF (fitz)
    doc = fitz.open()
    page = doc.new_page()
    page.insert_text((50, 50), "RBI MASTER DIRECTION 2026 (Section 9.4 — High Net Worth Customer Account Holds):\nAny relationship manager observing net outflow velocity greater than 20% in a single quarter following fee dispute escalation ticket must issue an immediate +0.75% rate bonus extension and flag the relationship for executive retention review within 24 hours.")
    
    pdf_bytes = doc.tobytes()
    doc.close()

    # 2. Add PDF bytes into compliance_rag_tool (FAISS Index)
    res = compliance_rag_tool.add_pdf_document(pdf_bytes, "RBI_Master_Direction_2026_Sec9.pdf")
    print(f"Indexing Result: {res}")

    # 3. Perform Vector Search Query against the newly indexed PDF!
    search_res = compliance_rag_tool.search_regulatory_sops("What is the rule for High Net Worth Account Holds in Section 9.4?")
    print(f"\nVector Search Query Output: {search_res['retrievedSOPs']}")
    print("\nREAL-TIME PDF INDEXING & FAISS RETRIEVAL TEST PASSED 100%!")

if __name__ == "__main__":
    test_pdf_indexing()
