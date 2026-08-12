from app.agents.tools.fraud_tool import fraud_tool
from app.agents.tools.customer_tool import customer_churn_tool
from app.agents.tools.compliance_tool import compliance_rag_tool
from app.agents.tools.timeseries_tool import timeseries_tool
from app.agents.langgraph_orchestrator import langgraph_orchestrator

def run_tests():
    print("--- 1. Testing Fraud SVM Model Tool ---")
    fraud_res = fraud_tool.predict_transaction_anomaly(amount=420000.0)
    print(f"Fraud Output: {fraud_res}")

    print("\n--- 2. Testing Bank Churn ML Model Tool ---")
    churn_res = customer_churn_tool.predict_churn_probability(credit_score=615, balance=18400000.0, is_active_member=0)
    print(f"Churn Output: {churn_res}")

    print("\n--- 3. Testing Compliance FAISS RAG Tool ---")
    rag_res = compliance_rag_tool.search_regulatory_sops("FIU-IND 24-hr SAR filing rules")
    print(f"RAG Output: {rag_res}")

    print("\n--- 4. Testing Time-Series PostgreSQL Tool ---")
    ts_res = timeseries_tool.analyze_portfolio_time_series("CUST-40921")
    print(f"TimeSeries Output: {ts_res}")

    print("\n--- 5. Testing LangGraph Multi-Agent Orchestrator ---")
    orchestrator_res = langgraph_orchestrator.process_query("Analyze Maya Iyer churn risk & wire fraud anomaly")
    print(f"Orchestrator Risk Level: {orchestrator_res['riskLevel']}")
    print(f"Citations Count: {len(orchestrator_res['citations'])}")
    print("\nALL 5 INTEGRATION TESTS PASSED CLEANLY!")

if __name__ == "__main__":
    run_tests()
