import os
import pickle
import pandas as pd
from typing import Dict, Any

ML_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "ml")
MODEL_PATH = os.path.join(ML_DIR, "churn_model.pkl")
SCALER_PATH = os.path.join(ML_DIR, "scaler.pkl")
ENCODERS_PATH = os.path.join(ML_DIR, "encoders.pkl")

class CustomerChurnTool:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.encoders = None

        if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH) and os.path.exists(ENCODERS_PATH):
            try:
                with open(MODEL_PATH, "rb") as f:
                    self.model = pickle.load(f)
                with open(SCALER_PATH, "rb") as f:
                    self.scaler = pickle.load(f)
                with open(ENCODERS_PATH, "rb") as f:
                    self.encoders = pickle.load(f)
            except Exception as e:
                print(f"Warning: Failed to load Churn Model files: {e}")

    def predict_churn_probability(
        self,
        credit_score: int = 615,
        geography: str = "France",
        gender: str = "Female",
        age: int = 42,
        tenure: int = 6,
        balance: float = 184000.0,
        num_products: int = 2,
        has_credit_card: int = 1,
        is_active_member: int = 0,
        estimated_salary: float = 125000.0,
    ) -> Dict[str, Any]:
        """
        Executes trained Churn Prediction ML Model
        to calculate churn probability and retention risk trajectory.
        """
        if self.model is not None and self.scaler is not None and self.encoders is not None:
            try:
                input_data = {
                    "CreditScore": [credit_score],
                    "Geography": [geography],
                    "Gender": [gender],
                    "Age": [Age if 'Age' in locals() else age],
                    "Tenure": [tenure],
                    "Balance": [balance],
                    "NumOfProducts": [num_products],
                    "HasCrCard": [has_credit_card],
                    "IsActiveMember": [is_active_member],
                    "EstimatedSalary": [estimated_salary],
                }
                df_input = pd.DataFrame(input_data)

                # Encode categorical features
                for col, encoder in self.encoders.items():
                    if col in df_input.columns:
                        df_input[col] = encoder.transform(df_input[col])

                # Scale
                df_scaled = self.scaler.transform(df_input)

                # Predict
                pred = self.model.predict(df_scaled)[0]
                prob = float(self.model.predict_proba(df_scaled)[0][1])

                return {
                    "churnPredicted": bool(pred == 1),
                    "churnProbability": round(prob, 2),
                    "churnPercentage": f"{int(prob * 100)}%",
                    "riskTier": "High Churn Risk" if prob > 0.6 else "Moderate Risk" if prob > 0.3 else "Low Risk",
                    "modelType": "Random Forest Classifier (Trained)",
                }
            except Exception as e:
                print(f"Churn ML Prediction Exception: {e}")

        # Fallback heuristic calculation if pickled model instance unavailable
        prob = 0.92 if is_active_member == 0 and balance > 100000.0 else 0.25
        return {
            "churnPredicted": prob > 0.5,
            "churnProbability": prob,
            "churnPercentage": f"{int(prob * 100)}%",
            "riskTier": "High Churn Risk" if prob > 0.6 else "Low Risk",
            "modelType": "Heuristic Churn Telemetry",
        }

customer_churn_tool = CustomerChurnTool()
