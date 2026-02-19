def engineer_features(case_data: dict):
    return {
        "unique_senders_7d": case_data["unique_senders_7d"],
        "inflow_outflow_ratio": case_data["inflow_outflow_ratio"],
        "transaction_velocity": case_data["transaction_velocity"],
        "cash_deposit_ratio": case_data["cash_deposit_ratio"],
        "foreign_transfer_flag": case_data["foreign_transfer_flag"],
        "avg_amount_deviation": case_data["avg_amount_deviation"]
    }
