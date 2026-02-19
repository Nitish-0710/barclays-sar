import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
import joblib
import os

MODEL_PATH = "models/logistic_model.pkl"

def train_and_save_model():
    np.random.seed(42)
    n = 1000

    # Generate synthetic feature data
    data = pd.DataFrame({
        "unique_senders_7d": np.random.randint(1, 50, n),
        "inflow_outflow_ratio": np.random.uniform(0.1, 5, n),
        "transaction_velocity": np.random.uniform(0.1, 20, n),
        "cash_deposit_ratio": np.random.uniform(0, 1, n),
        "foreign_transfer_flag": np.random.randint(0, 2, n),
        "avg_amount_deviation": np.random.uniform(0, 3, n)
    })

    # Synthetic risk logic
    data["label"] = (
        (data["unique_senders_7d"] > 30) |
        (data["transaction_velocity"] > 15) |
        (data["foreign_transfer_flag"] == 1)
    ).astype(int)

    X = data.drop("label", axis=1)
    y = data["label"]

    model = LogisticRegression(max_iter=1000)
    model.fit(X, y)

    os.makedirs("models", exist_ok=True)
    joblib.dump(model, MODEL_PATH)

    print("Model trained and saved at:", MODEL_PATH)


if __name__ == "__main__":
    train_and_save_model()
