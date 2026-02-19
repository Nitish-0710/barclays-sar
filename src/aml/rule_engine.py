def evaluate_rules(case_data: dict):
    rules_triggered = []

    # Rule 1: High unique senders
    if case_data["unique_senders_7d"] > 30:
        rules_triggered.append({
            "name": "High Unique Sender Spike",
            "severity": 20
        })

    # Rule 2: High transaction velocity
    if case_data["transaction_velocity"] > 15:
        rules_triggered.append({
            "name": "High Transaction Velocity",
            "severity": 20
        })

    # Rule 3: Foreign transfer
    if case_data["foreign_transfer_flag"] == 1:
        rules_triggered.append({
            "name": "Foreign Transfer After Aggregation",
            "severity": 25
        })

    # Rule 4: High inflow-outflow imbalance
    if case_data["inflow_outflow_ratio"] > 3:
        rules_triggered.append({
            "name": "High Inflow-Outflow Imbalance",
            "severity": 15
        })

    # Rule 5: High cash deposit ratio
    if case_data["cash_deposit_ratio"] > 0.7:
        rules_triggered.append({
            "name": "Excessive Cash Deposit Activity",
            "severity": 10
        })

    # Rule 6: High amount deviation
    if case_data["avg_amount_deviation"] > 2:
        rules_triggered.append({
            "name": "Unusual Transaction Amount Pattern",
            "severity": 10
        })

    return rules_triggered


def classify_typology(rules: list):
    rule_names = [r["name"] for r in rules]

    if "Foreign Transfer After Aggregation" in rule_names:
        return "Layering"

    if "High Unique Sender Spike" in rule_names:
        return "Structuring"

    if "Excessive Cash Deposit Activity" in rule_names:
        return "Placement"

    if "High Transaction Velocity" in rule_names:
        return "Rapid Movement"

    return "Unclassified"
