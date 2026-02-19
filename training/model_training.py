import numpy as np
import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline


MODEL_PATH = "../models/logistic_model.pkl"


def generate_synthetic_data(n_samples=3000):

    X = []
    y = []

    for _ in range(n_samples):

        # Random baseline values
        unique_senders = np.random.randint(1, 50)
        inflow_outflow_ratio = np.random.uniform(0.5, 5.0)
        transaction_velocity = np.random.randint(1, 25)
        cash_deposit_ratio = np.random.uniform(0.0, 1.0)
        foreign_flag = np.random.randint(0, 2)
        avg_deviation = np.random.uniform(0.0, 3.0)

        features = [
            unique_senders,
            inflow_outflow_ratio,
            transaction_velocity,
            cash_deposit_ratio,
            foreign_flag,
            avg_deviation
        ]

        # Suspicion rule logic (label generation)
        suspicious = (
            unique_senders > 30
            or transaction_velocity > 18
            or foreign_flag == 1
            or inflow_outflow_ratio > 3.5
            or avg_deviation > 2.0
        )

        X.append(features)
        y.append(int(suspicious))

    return np.array(X), np.array(y)


def train():

    X, y = generate_synthetic_data()

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    pipeline = Pipeline([
        ("scaler", StandardScaler()),
        ("clf", LogisticRegression(max_iter=1000))
    ])

    pipeline.fit(X_train, y_train)

    score = pipeline.score(X_test, y_test)
    print("Validation Accuracy:", round(score, 4))

    joblib.dump(pipeline, MODEL_PATH)
    print("Model saved to:", MODEL_PATH)


if __name__ == "__main__":
    train()
