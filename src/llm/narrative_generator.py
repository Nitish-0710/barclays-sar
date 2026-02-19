import ollama

MODEL_NAME = "llama3.1:8b"

def generate_narrative(case_data, rules, probability, regulatory_context):


    prompt = f"""
You are a compliance officer drafting a Suspicious Activity Report (SAR)
for regulatory submission under Anti-Money Laundering (AML) requirements.

This task is for internal compliance documentation, not law enforcement.

Use only the provided structured data.
Do NOT speculate.
Do NOT mention criminal accusations.
Do NOT imply guilt.

Customer Data:
{case_data}

Triggered Red Flags:
{rules}

ML Suspicion Probability:
{probability:.2f}

Relevant Regulatory Context:
{regulatory_context}

Write a formal SAR narrative with the following sections:

1. Subject Information
2. Suspicious Activity Description
3. Risk Indicators
4. Compliance Assessment

Maintain neutral compliance tone.
"""



    response = ollama.chat(
        model=MODEL_NAME,
        messages=[{"role": "user", "content": prompt}]
    )

    return response["message"]["content"]



