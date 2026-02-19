def validate_output(narrative: str, rules: list, probability: float):
    issues = []

    if not narrative or len(narrative.strip()) == 0:
        issues.append("Narrative is empty.")

    if not isinstance(probability, float):
        issues.append("ML probability is not a float.")

    if not isinstance(rules, list):
        issues.append("Rule flags format invalid.")

    return {
        "valid": len(issues) == 0,
        "issues": issues
    }
