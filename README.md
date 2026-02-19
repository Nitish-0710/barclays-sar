sar-mvp/
│
├── data/
│   ├── synthetic_cases/
│   └── regulatory_docs/
│
├── models/
│   └── logistic_model.pkl
│
├── src/
│   ├── data_gen/
│   │   └── generator.py
│   │
│   ├── aml/
│   │   ├── rule_engine.py
│   │   ├── feature_engineering.py
│   │   └── risk_model.py
│   │
│   ├── rag/
│   │   └── vector_store.py
│   │
│   ├── llm/
│   │   ├── narrative_generator.py
│   │   └── validation.py
│   │
│   ├── audit/
│   │   └── audit_logger.py
│   │
│   └── pipeline.py
│
├── chroma_db/
├── requirements.txt
└── README.md


📌 SAR Intelligence Engine – Hybrid AML Risk + GenAI System
Overview

This project implements a hybrid Anti-Money Laundering (AML) intelligence engine that combines:

Deterministic rule-based detection

Probabilistic ML risk scoring

Risk fusion logic

Retrieval-Augmented Generation (RAG)

Local LLM-based SAR drafting

Full audit traceability

The system is designed as a modular microservice that integrates with a MERN frontend via REST API.

🏗 Architecture
Frontend (React)
        ↓
Node.js / Express
        ↓
FastAPI (ML Runtime Service)
        ↓
----------------------------------
|  Rule Engine                  |
|  Feature Engineering          |
|  Logistic Regression Model    |
|  Risk Fusion Logic            |
|  Typology Classification      |
|  RAG (ChromaDB)               |
|  LLM (Ollama – Llama 3.1)     |
|  Validation Layer             |
|  Audit Trail                  |
----------------------------------

Architectural Principles

Clear separation of training and inference

Strict feature schema contract

Stable API response schema

Deterministic + probabilistic hybrid scoring

Local inference (no external API dependency)

Explainable ML (coefficient-based drivers)

⚙ Core Components
1️⃣ Rule Engine

Implements deterministic AML red flags such as:

High unique sender spike

Rapid transaction velocity

Foreign transfer after aggregation

Inflow–outflow imbalance

Excessive cash deposits

Unusual transaction deviation

Each rule returns:

{
  "name": "Rule Name",
  "severity": 20
}

2️⃣ ML Risk Model

Model Type:

Logistic Regression

Scaled using StandardScaler

Calibrated classifier

Input Feature Schema (ORDERED):

[
    "unique_senders_7d",
    "inflow_outflow_ratio",
    "transaction_velocity",
    "cash_deposit_ratio",
    "foreign_transfer_flag",
    "avg_amount_deviation"
]


Output:

ml_probability (0–1)

Case-level top drivers (feature × coefficient contribution)

3️⃣ Risk Fusion Logic

Final Risk Score:

final_risk_score =
(0.5 × normalized_rule_score + 0.5 × ml_probability) × 100


Risk Bands:

Score	Risk Band
≥ 75	High
40–74	Medium
< 40	Low

Threshold for SAR generation:

final_risk_score ≥ 60

4️⃣ RAG (Regulatory Grounding)

Vector database: ChromaDB

Embedding: all-MiniLM-L6-v2

Retrieves AML typology descriptions

Injected into LLM prompt for grounding

5️⃣ LLM Narrative Generator

Model: Llama 3.1 (via Ollama)

Runs locally

Structured SAR format

Triggered only if risk ≥ threshold

Skipped for low-risk cases

6️⃣ Audit Trail

Each stage logs:

Rule detection

Feature engineering

ML inference

Risk fusion

Typology classification

RAG retrieval

Narrative generation

Validation

Ensures explainability and traceability.

📦 File Structure
sar-mvp/
│
├── models/
│   └── logistic_model.pkl
│
├── src/
│   ├── api/
│   │   └── server.py
│   │
│   ├── aml/
│   │   ├── rule_engine.py
│   │   ├── feature_engineering.py
│   │   └── risk_model.py
│   │
│   ├── rag/
│   │   └── vector_store.py
│   │
│   ├── llm/
│   │   ├── narrative_generator.py
│   │   └── validation.py
│   │
│   └── pipeline.py
│
├── chroma_db/
├── requirements.txt
└── README.md

🚀 Running the Project
1️⃣ Create Virtual Environment
python -m venv venv
venv\Scripts\activate

2️⃣ Install Dependencies
pip install -r requirements.txt

3️⃣ Install and Pull LLM Model

Install Ollama:
https://ollama.com

Pull model:

ollama pull llama3.1

4️⃣ Run API
uvicorn src.api.server:app --reload


Open:

http://127.0.0.1:8000/docs

🔌 API Contract
POST /analyze
Request
{
  "unique_senders_7d": 40,
  "inflow_outflow_ratio": 4.0,
  "transaction_velocity": 18,
  "cash_deposit_ratio": 0.8,
  "foreign_transfer_flag": 1,
  "avg_amount_deviation": 2.5
}

Response (Stable Schema)
{
  "customer_info": {},
  "rule_flags": [],
  "rule_score": 75,
  "ml_probability": 0.82,
  "final_risk_score": 84.3,
  "risk_band": "High",
  "top_drivers": [],
  "typology": "Layering",
  "narrative": "...",
  "validation": {},
  "audit_trail": []
}


⚠ Response schema must remain stable for frontend compatibility.

📊 Model Transparency

This model is built for demonstration purposes using structured financial risk proxy data.

In a production banking environment, the logistic regression model would be trained on:

Historical SAR cases

Confirmed AML investigations

Institution-specific transaction logs

The architecture is designed to support real AML datasets without structural modification.

🧠 Design Highlights

Hybrid deterministic + probabilistic intelligence

Case-level explainability without SHAP

Contract-driven microservice architecture

Local LLM inference (privacy-preserving)

Clean separation of concerns

API-first design

⚠ Disclaimer

This system is a research / hackathon prototype and does not replace regulatory compliance processes. It is intended to demonstrate AML intelligence architecture and risk scoring workflow.

📌 Status

✔ Rule Engine
✔ ML Risk Model
✔ Risk Fusion
✔ Explainability
✔ RAG Integration
✔ LLM SAR Drafting
✔ Audit Trail
✔ FastAPI Runtime