from src.aml.rule_engine import evaluate_rules, classify_typology
from src.aml.risk_model import RiskModel
from src.llm.narrative_generator import generate_narrative
from src.llm.validation import validate_output
from src.rag.vector_store import AMLVectorStore


risk_model = RiskModel()
vector_store = AMLVectorStore()

FINAL_RISK_THRESHOLD = 60


def determine_risk_band(score: float):
    if score >= 75:
        return "High"
    elif score >= 40:
        return "Medium"
    return "Low"


def run_pipeline(case: dict):

    audit_trail = []

    # ================= Rule Detection =================
    rule_flags = evaluate_rules(case)
    rule_score = sum(r["severity"] for r in rule_flags)

    audit_trail.append({
        "step": "Rule Detection",
        "details": {
            "rules_triggered": rule_flags,
            "rule_score": rule_score
        }
    })

    # ================= Feature Engineering =================
    features = case

    audit_trail.append({
        "step": "Feature Engineering",
        "details": features
    })

    # ================= ML Inference =================
    ml_probability = risk_model.predict_probability(features)
    top_drivers = risk_model.get_top_drivers(features)

    audit_trail.append({
        "step": "ML Inference",
        "details": {
            "ml_probability": ml_probability,
            "top_drivers": top_drivers
        }
    })

    # ================= Risk Fusion =================
    normalized_rule_score = min(rule_score / 100, 1)

    final_risk_score = round(
        (0.5 * normalized_rule_score + 0.5 * ml_probability) * 100,
        2
    )

    risk_band = determine_risk_band(final_risk_score)

    audit_trail.append({
        "step": "Risk Fusion",
        "details": {
            "normalized_rule_score": normalized_rule_score,
            "final_risk_score": final_risk_score,
            "risk_band": risk_band
        }
    })

    # ================= Typology =================
    typology = classify_typology(rule_flags)

    audit_trail.append({
        "step": "Typology Classification",
        "details": typology
    })

    # ================= RAG =================
    regulatory_context = []

    if typology != "Unclassified":
        regulatory_context = vector_store.query(typology)

    audit_trail.append({
        "step": "RAG Retrieval",
        "details": regulatory_context
    })

    # ================= Narrative =================
    if final_risk_score >= FINAL_RISK_THRESHOLD:

        narrative = generate_narrative(
            customer_info=case,
            rule_flags=rule_flags,
            ml_probability=ml_probability,
            typology=typology,
            regulatory_context=regulatory_context
        )

    else:
        narrative = (
            "Risk score below reporting threshold. "
            "No Suspicious Activity Report (SAR) generated. "
            "Account recommended for continued monitoring."
        )

    audit_trail.append({
        "step": "Narrative Generation",
        "details": "Generated based on threshold logic"
    })

    # ================= Validation =================
    validation = validate_output(narrative, rule_flags, ml_probability)

    audit_trail.append({
        "step": "Validation",
        "details": validation
    })

    # ================= Final Contract Output =================
    return {
        "customer_info": case,
        "rule_flags": rule_flags,
        "rule_score": rule_score,
        "ml_probability": ml_probability,
        "final_risk_score": final_risk_score,
        "risk_band": risk_band,
        "top_drivers": top_drivers,
        "typology": typology,
        "narrative": narrative,
        "validation": validation,
        "audit_trail": audit_trail
    }


# {
#   "unique_senders_7d": 2,
#   "inflow_outflow_ratio": 1.1,
#   "transaction_velocity": 3,
#   "cash_deposit_ratio": 0.2,
#   "foreign_transfer_flag": 0,
#   "avg_amount_deviation": 0.3
# }
