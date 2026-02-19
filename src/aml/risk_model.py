import joblib
import numpy as np


class RiskModel:

    FEATURE_ORDER = [
        "unique_senders_7d",
        "inflow_outflow_ratio",
        "transaction_velocity",
        "cash_deposit_ratio",
        "foreign_transfer_flag",
        "avg_amount_deviation"
    ]

    DRIVER_LABELS = {
        "unique_senders_7d": "Multiple unique counterparties",
        "inflow_outflow_ratio": "High inflow-outflow imbalance",
        "transaction_velocity": "High transaction velocity",
        "cash_deposit_ratio": "Elevated cash deposit ratio",
        "foreign_transfer_flag": "Foreign transfer activity",
        "avg_amount_deviation": "Unusual transaction amount pattern"
    }

    def __init__(self, model_path="models/logistic_model.pkl"):
        self.model = joblib.load(model_path)

        # Extract classifier safely from pipeline
        try:
            self.classifier = self.model.named_steps["clf"]
        except Exception:
            self.classifier = self.model

    def _build_feature_array(self, features: dict):
        return np.array([[features[f] for f in self.FEATURE_ORDER]])

    def predict_probability(self, features: dict):
        X = self._build_feature_array(features)
        prob = self.model.predict_proba(X)[0][1]
        return round(float(prob), 4)

    def get_top_drivers(self, features: dict, top_n=2):

        try:
            coeffs = self.classifier.coef_[0]
        except Exception:
            return []

        feature_values = np.array([features[f] for f in self.FEATURE_ORDER])

        contributions = coeffs * feature_values

        abs_contributions = np.abs(contributions)
        top_indices = abs_contributions.argsort()[-top_n:][::-1]

        drivers = []
        for idx in top_indices:
            feature_name = self.FEATURE_ORDER[idx]
            drivers.append(self.DRIVER_LABELS.get(feature_name, feature_name))

        return drivers

