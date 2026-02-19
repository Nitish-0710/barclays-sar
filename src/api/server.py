from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from src.pipeline import run_pipeline

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CaseInput(BaseModel):
    unique_senders_7d: int
    inflow_outflow_ratio: float
    transaction_velocity: float
    cash_deposit_ratio: float
    foreign_transfer_flag: int
    avg_amount_deviation: float
    
@app.get("/")
def health_check():
    return {
        "status": "AML Intelligence Service Running",
        "version": "1.0"
    }

@app.post("/analyze")
def analyze_case(case: CaseInput):
    result = run_pipeline(case.model_dump())
    return result
