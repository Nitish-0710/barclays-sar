export type CaseType = "structuring" | "layering" | "trade_based" | "normal";

export interface CaseData {
  id: string;
  type: CaseType;
  label: string;
  customer: {
    id: string;
    name: string;
    occupation: string;
    annualIncome: string;
    accountType: string;
    branch: string;
    since: string;
  };
  transactions: {
    total: number;
    inflow: string;
    outflow: string;
    period: string;
    avgTicket: string;
  };
  ruleScore: number;
  redFlags: { flag: string; severity: "critical" | "high" | "medium" }[];
  mlProbability: number;
  riskLevel: "Critical" | "High" | "Medium" | "Low";
  typology: string;
  narrative: string;
  auditTrail: AuditStep[];
  validation: string[];
}

export interface AuditStep {
  step: number;
  title: string;
  icon: string;
  summary: string;
  details: string[];
  outputs: { key: string; value: string }[];
}

export const CASES: Record<CaseType, CaseData> = {
  structuring: {
    id: "CASE-2024-0847",
    type: "structuring",
    label: "Structuring",
    customer: {
      id: "CUST-10291",
      name: "Rajesh Kumar Mehta",
      occupation: "Small Business Owner",
      annualIncome: "₹12,00,000",
      accountType: "Current Account",
      branch: "Mumbai — Andheri West",
      since: "Mar 2019",
    },
    transactions: {
      total: 87,
      inflow: "₹48,35,000",
      outflow: "₹47,20,000",
      period: "Jan 2024 – Jun 2024",
      avgTicket: "₹55,575",
    },
    ruleScore: 82,
    redFlags: [
      { flag: "28 cash deposits below ₹10L threshold within 60 days", severity: "critical" },
      { flag: "Structured deposits averaging ₹9.2L — classic smurfing pattern", severity: "critical" },
      { flag: "Rapid fund movement (>90% outflow within 72 hrs)", severity: "high" },
      { flag: "No matching business revenues in ITR filings", severity: "high" },
      { flag: "Multiple transactions at different branch locations same day", severity: "medium" },
    ],
    mlProbability: 84,
    riskLevel: "High",
    typology: "Structuring / Smurfing",
    narrative: `SUSPICIOUS ACTIVITY REPORT — DRAFT

Case Reference: CASE-2024-0847
Reporting Entity: [Bank Name] | Branch: Mumbai, Andheri West
Prepared by: AI Compliance Engine | Date: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
Regulatory Framework: Prevention of Money Laundering Act, 2002 (PMLA) | FIU-IND Reporting Obligation

1. CUSTOMER PROFILE
Account holder Rajesh Kumar Mehta (CUST-10291), a small business owner domiciled in Mumbai, has maintained a current account since March 2019. The account profile indicates declared annual income of ₹12,00,000.

2. SUSPICIOUS ACTIVITY DESCRIPTION
During the reporting period January 2024 to June 2024, a total of 87 transactions were recorded with aggregate inflows of ₹48,35,000. Analysis reveals a systematic pattern of 28 cash deposits each structured below the ₹10,00,000 reporting threshold, averaging ₹9,20,000 per deposit — a technique consistent with structuring ("smurfing") as defined under Section 3 of PMLA 2002. Deposited funds were transferred out within 72 hours in over 90% of instances, indicating layering intent with no legitimate business purpose identified.

3. INDICATORS OF SUSPICIOUS ACTIVITY
The rule-based detection engine identified a composite risk score of 82/100 with ML-based probability assessment of 84% indicative of High-risk typology aligned with structuring patterns. Deposits were made across multiple branch locations on identical calendar dates, further evidencing coordinated structuring activity.

4. REGULATORY GROUNDS FOR REPORTING
This activity is reportable under Section 12 of PMLA 2002 and FIU-IND STR guidelines. The pattern meets the threshold for Suspicious Transaction Report filing within prescribed timelines.

5. ANALYST CERTIFICATION
This SAR narrative has been generated with AI-assisted analysis and is subject to authorized compliance officer review prior to submission.`,
    auditTrail: [
      {
        step: 1,
        title: "Rule Detection Engine",
        icon: "shield",
        summary: "AML rule engine evaluated 23 predefined rules against transaction records. 5 high-confidence rules triggered.",
        details: [
          "Rule R-001: Cash transactions below ₹10L threshold — 28 instances detected (TRIGGERED)",
          "Rule R-007: Same-day multi-branch activity — 6 instances detected (TRIGGERED)",
          "Rule R-012: Rapid fund turnaround <72 hrs — 91% transactions (TRIGGERED)",
          "Rule R-018: Income-to-transaction ratio anomaly — 4.0x declared income (TRIGGERED)",
          "Rule R-022: Geographic inconsistency in transaction locations (TRIGGERED)",
        ],
        outputs: [
          { key: "Rules Evaluated", value: "23" },
          { key: "Rules Triggered", value: "5" },
          { key: "Rule Confidence Score", value: "82 / 100" },
          { key: "Primary Typology Match", value: "Structuring" },
        ],
      },
      {
        step: 2,
        title: "Feature Engineering",
        icon: "cpu",
        summary: "ML pipeline extracted 18 behavioral and transactional features from raw data for model inference.",
        details: [
          "avg_deposit_amount: ₹9,20,000 (below threshold cluster)",
          "cash_deposit_frequency: 28 / 180 days = 0.156 per day",
          "fund_velocity: 91.3% outflow within 72 hours",
          "income_transaction_ratio: 4.03x annual declared income",
          "branch_diversity_index: 0.78 (multi-location)",
          "transaction_regularity_score: 0.12 (irregular — anomalous)",
        ],
        outputs: [
          { key: "Features Extracted", value: "18" },
          { key: "Feature Importance (Top)", value: "cash_deposit_frequency" },
          { key: "Anomaly Score", value: "0.86" },
          { key: "Data Quality", value: "98.2%" },
        ],
      },
      {
        step: 3,
        title: "ML Inference (Logistic Regression)",
        icon: "brain",
        summary: "Trained Logistic Regression model scored the case with 84% probability of suspicious activity.",
        details: [
          "Model: Logistic Regression (trained on 12,500 historical SAR cases)",
          "Input features: 18 engineered features normalized via StandardScaler",
          "Positive class probability: 0.84 (High Risk threshold: 0.70)",
          "Decision boundary: Exceeded — classified as SUSPICIOUS",
          "Model accuracy on validation set: 91.3% | AUC-ROC: 0.94",
          "Prediction confidence interval: [0.79, 0.89] at 95% CI",
        ],
        outputs: [
          { key: "Model Type", value: "Logistic Regression" },
          { key: "Probability Score", value: "84%" },
          { key: "Classification", value: "SUSPICIOUS" },
          { key: "Model Version", value: "v2.3.1" },
        ],
      },
      {
        step: 4,
        title: "Regulatory Retrieval (RAG)",
        icon: "database",
        summary: "Vector search retrieved 6 relevant regulatory clauses from PMLA 2002, FIU-IND guidelines, and RBI Master Directions.",
        details: [
          "Retrieved: PMLA 2002 Section 3 — Offence of Money Laundering",
          "Retrieved: PMLA 2002 Section 12 — Obligation of banking companies to maintain records",
          "Retrieved: FIU-IND STR Guidelines v4.2 — Structuring Indicators",
          "Retrieved: RBI Master Direction on KYC 2016 — Enhanced Due Diligence",
          "Retrieved: FATF Guidance on Smurfing and Structuring Typologies (2022)",
          "Relevance scores: 0.93, 0.91, 0.88, 0.85, 0.82 (cosine similarity)",
        ],
        outputs: [
          { key: "Documents Retrieved", value: "6 clauses" },
          { key: "Vector DB", value: "ChromaDB" },
          { key: "Embedding Model", value: "all-MiniLM-L6-v2" },
          { key: "Top Relevance Score", value: "0.93" },
        ],
      },
      {
        step: 5,
        title: "Narrative Generation (LLM)",
        icon: "file-text",
        summary: "Local LLM synthesized all findings into a formal SAR narrative grounded in regulatory context.",
        details: [
          "Model: Mistral-7B-Instruct (local inference, no data exfiltration)",
          "Prompt template: SAR_COMPLIANCE_V3 with regulatory context injection",
          "Context window: 4,096 tokens | Generated: 487 tokens",
          "Regulatory grounding: 6 clauses injected as system context",
          "Tone enforcement: Formal legal compliance language",
          "Hallucination guard: Validated against rule engine outputs",
        ],
        outputs: [
          { key: "LLM Model", value: "Mistral-7B (Local)" },
          { key: "Tokens Generated", value: "487" },
          { key: "Generation Time", value: "2.3s" },
          { key: "Regulatory Citations", value: "4 cited" },
        ],
      },
      {
        step: 6,
        title: "Validation & Quality Check",
        icon: "check-circle",
        summary: "Post-generation validation passed all compliance checks. Narrative cleared for analyst review.",
        details: [
          "Check 1: All mandatory SAR fields present — PASS",
          "Check 2: Regulatory citations accurate — PASS",
          "Check 3: Factual consistency with transaction data — PASS",
          "Check 4: No PII leakage beyond permitted fields — PASS",
          "Check 5: Formal compliance language tone — PASS",
          "Check 6: PMLA Section 12 reporting obligation confirmed — PASS",
        ],
        outputs: [
          { key: "Validation Status", value: "ALL PASS" },
          { key: "Checks Performed", value: "6 / 6" },
          { key: "Compliance Ready", value: "Yes" },
          { key: "Pending Action", value: "Analyst Approval" },
        ],
      },
    ],
    validation: [
      "All mandatory SAR fields present",
      "Regulatory citations verified against PMLA 2002",
      "Factual consistency with raw transaction data confirmed",
      "PII handling within permitted disclosure scope",
    ],
  },

  layering: {
    id: "CASE-2024-0911",
    type: "layering",
    label: "Layering",
    customer: {
      id: "CUST-20487",
      name: "Priya Investments Pvt. Ltd.",
      occupation: "Investment Firm",
      annualIncome: "₹2,50,00,000",
      accountType: "Corporate Current Account",
      branch: "Delhi — Connaught Place",
      since: "Aug 2021",
    },
    transactions: {
      total: 134,
      inflow: "₹3,85,00,000",
      outflow: "₹3,79,00,000",
      period: "Oct 2023 – Mar 2024",
      avgTicket: "₹28,73,134",
    },
    ruleScore: 91,
    redFlags: [
      { flag: "Complex web of 14 shell entity transfers obscuring fund origin", severity: "critical" },
      { flag: "Round-trip transactions through 3 offshore jurisdictions", severity: "critical" },
      { flag: "Wire transfers to FATF non-compliant jurisdiction", severity: "critical" },
      { flag: "Beneficial ownership inconsistency with declared directors", severity: "high" },
      { flag: "Dormant account suddenly activated with large transfers", severity: "medium" },
    ],
    mlProbability: 93,
    riskLevel: "Critical",
    typology: "Layering via Shell Entities",
    narrative: `SUSPICIOUS ACTIVITY REPORT — DRAFT

Case Reference: CASE-2024-0911
Reporting Entity: [Bank Name] | Branch: Delhi, Connaught Place
Prepared by: AI Compliance Engine | Date: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
Regulatory Framework: PMLA 2002 | FIU-IND | FATF Recommendation 16

1. CUSTOMER PROFILE
Priya Investments Pvt. Ltd. (CUST-20487), incorporated as an investment firm, maintains a corporate current account with aggregate declared turnover of ₹2,50,00,000.

2. SUSPICIOUS ACTIVITY DESCRIPTION
A complex layering scheme was identified involving ₹3,85,00,000 in inflows across 134 transactions. Analysis reveals an intricate network of 14 shell entities used to obscure beneficial ownership and fund origin. Round-trip transactions through 3 offshore jurisdictions with documented FATF non-compliance were identified, consistent with typologies of layering to distance illicit proceeds from their source.

3. REGULATORY GROUNDS
Reportable under PMLA 2002 Section 3 and 12, and FATF Recommendation 16 on wire transfers.`,
    auditTrail: [
      {
        step: 1,
        title: "Rule Detection Engine",
        icon: "shield",
        summary: "Rule engine triggered 7 high-confidence rules including offshore transfer and shell entity patterns.",
        details: [
          "Rule R-031: Offshore jurisdiction wire transfer — 3 jurisdictions (TRIGGERED)",
          "Rule R-044: Shell entity network analysis — 14 entities identified (TRIGGERED)",
          "Rule R-052: Round-trip transaction detection — 6 confirmed (TRIGGERED)",
          "Rule R-019: Beneficial ownership mismatch (TRIGGERED)",
          "Rule R-028: Dormant account sudden activation (TRIGGERED)",
        ],
        outputs: [
          { key: "Rules Evaluated", value: "23" },
          { key: "Rules Triggered", value: "7" },
          { key: "Rule Confidence Score", value: "91 / 100" },
          { key: "Primary Typology Match", value: "Layering" },
        ],
      },
      {
        step: 2, title: "Feature Engineering", icon: "cpu",
        summary: "18 features extracted including network complexity and offshore exposure indices.",
        details: ["network_complexity_index: 0.94", "offshore_exposure_ratio: 0.67", "entity_count: 14 shell entities", "dormancy_activation_delta: 847 days"],
        outputs: [{ key: "Features Extracted", value: "18" }, { key: "Network Complexity", value: "0.94" }, { key: "Offshore Ratio", value: "67%" }, { key: "Data Quality", value: "97.1%" }],
      },
      {
        step: 3, title: "ML Inference (Logistic Regression)", icon: "brain",
        summary: "Model returned 93% probability — Critical risk threshold exceeded.",
        details: ["Positive class probability: 0.93 (Critical threshold: 0.85)", "Classification: SUSPICIOUS — CRITICAL", "AUC-ROC: 0.94 on validation set"],
        outputs: [{ key: "Model Type", value: "Logistic Regression" }, { key: "Probability Score", value: "93%" }, { key: "Classification", value: "CRITICAL" }, { key: "Model Version", value: "v2.3.1" }],
      },
      {
        step: 4, title: "Regulatory Retrieval (RAG)", icon: "database",
        summary: "8 regulatory clauses retrieved including FATF Recommendation 16 and cross-border guidance.",
        details: ["PMLA 2002 Section 3 — Offence of Money Laundering", "FATF Recommendation 16 — Wire Transfer Rules", "RBI Cross-Border Payment Monitoring Guidelines"],
        outputs: [{ key: "Documents Retrieved", value: "8 clauses" }, { key: "Top Relevance Score", value: "0.96" }, { key: "FATF Guidance", value: "Included" }, { key: "Embedding Model", value: "all-MiniLM-L6-v2" }],
      },
      {
        step: 5, title: "Narrative Generation (LLM)", icon: "file-text",
        summary: "LLM generated formal layering SAR narrative with FATF typology grounding.",
        details: ["Model: Mistral-7B-Instruct (local)", "Generated: 521 tokens", "FATF typology references injected", "Offshore jurisdiction details included"],
        outputs: [{ key: "LLM Model", value: "Mistral-7B (Local)" }, { key: "Tokens Generated", value: "521" }, { key: "Generation Time", value: "2.8s" }, { key: "Regulatory Citations", value: "6 cited" }],
      },
      {
        step: 6, title: "Validation & Quality Check", icon: "check-circle",
        summary: "All validation checks passed. Priority flag set for immediate compliance officer escalation.",
        details: ["All mandatory SAR fields present — PASS", "Offshore jurisdiction references verified — PASS", "FATF non-compliant country list cross-checked — PASS", "Critical risk escalation flag set — PASS"],
        outputs: [{ key: "Validation Status", value: "ALL PASS" }, { key: "Escalation Flag", value: "CRITICAL" }, { key: "Compliance Ready", value: "Yes" }, { key: "Pending Action", value: "Urgent Review" }],
      },
    ],
    validation: ["Critical risk escalation flagged", "FATF country list cross-referenced", "Shell entity network documented", "Wire transfer records preserved"],
  },

  trade_based: {
    id: "CASE-2024-1023",
    type: "trade_based",
    label: "Trade-Based Laundering",
    customer: {
      id: "CUST-33891",
      name: "Bharat Exports & Imports",
      occupation: "Import/Export Business",
      annualIncome: "₹8,00,00,000",
      accountType: "Corporate Current Account",
      branch: "Chennai — Anna Salai",
      since: "Jun 2018",
    },
    transactions: {
      total: 62,
      inflow: "₹7,12,00,000",
      outflow: "₹6,95,00,000",
      period: "Jul 2023 – Jan 2024",
      avgTicket: "₹1,14,83,871",
    },
    ruleScore: 76,
    redFlags: [
      { flag: "Invoice values 40% above fair market price for declared goods", severity: "critical" },
      { flag: "Over-invoicing pattern across 12 consignments", severity: "high" },
      { flag: "Trade partner based in high-risk jurisdiction (Panama)", severity: "high" },
      { flag: "Goods description inconsistency between customs and bank records", severity: "medium" },
    ],
    mlProbability: 79,
    riskLevel: "High",
    typology: "Trade-Based Money Laundering (TBML)",
    narrative: `SUSPICIOUS ACTIVITY REPORT — DRAFT

Case Reference: CASE-2024-1023
Reporting Entity: [Bank Name] | Branch: Chennai, Anna Salai
Regulatory Framework: PMLA 2002 | FIU-IND | FATF TBML Guidance

Trade-Based Money Laundering identified through systematic over-invoicing of export goods by approximately 40% above fair market value across 12 consignments, with trade partner registered in Panama — a jurisdiction identified under FATF risk monitoring. The scheme facilitates cross-border value transfer disguised as legitimate trade finance.`,
    auditTrail: [
      {
        step: 1, title: "Rule Detection Engine", icon: "shield",
        summary: "TBML-specific rules triggered including invoice anomaly and geographic risk flags.",
        details: ["Rule R-061: Invoice over-valuation >30% — TRIGGERED", "Rule R-065: High-risk jurisdiction trade partner — TRIGGERED", "Rule R-071: Customs-bank record inconsistency — TRIGGERED"],
        outputs: [{ key: "Rules Triggered", value: "4" }, { key: "Rule Confidence Score", value: "76 / 100" }, { key: "Primary Typology", value: "TBML" }, { key: "Invoice Anomaly", value: "+40%" }],
      },
      {
        step: 2, title: "Feature Engineering", icon: "cpu",
        summary: "Trade-specific features extracted including price deviation indices and jurisdiction risk scores.",
        details: ["invoice_deviation_ratio: 1.41x fair market value", "jurisdiction_risk_score: 0.82 (Panama)", "consignment_regularity: 0.23 (irregular)"],
        outputs: [{ key: "Features Extracted", value: "18" }, { key: "Price Deviation", value: "+41%" }, { key: "Jurisdiction Risk", value: "0.82" }, { key: "Data Quality", value: "96.4%" }],
      },
      {
        step: 3, title: "ML Inference (Logistic Regression)", icon: "brain",
        summary: "79% probability — High risk classification for TBML typology.",
        details: ["Positive class probability: 0.79", "TBML-specific model features weighted higher", "Classification: SUSPICIOUS — HIGH"],
        outputs: [{ key: "Probability Score", value: "79%" }, { key: "Classification", value: "HIGH RISK" }, { key: "Model Version", value: "v2.3.1" }, { key: "AUC-ROC", value: "0.94" }],
      },
      {
        step: 4, title: "Regulatory Retrieval (RAG)", icon: "database",
        summary: "FATF TBML guidance and RBI trade finance monitoring guidelines retrieved.",
        details: ["FATF Guidance on TBML (2023 Update)", "RBI Master Circular — Trade Finance Monitoring", "PMLA 2002 Section 3 — applicable to TBML"],
        outputs: [{ key: "Documents Retrieved", value: "7 clauses" }, { key: "Top Relevance Score", value: "0.91" }, { key: "FATF TBML Guidance", value: "Included" }, { key: "Embedding Model", value: "all-MiniLM-L6-v2" }],
      },
      {
        step: 5, title: "Narrative Generation (LLM)", icon: "file-text",
        summary: "Trade-specific SAR narrative generated with FATF TBML grounding.",
        details: ["Model: Mistral-7B-Instruct (local)", "Generated: 503 tokens", "TBML typology indicators highlighted"],
        outputs: [{ key: "Tokens Generated", value: "503" }, { key: "Generation Time", value: "2.6s" }, { key: "Regulatory Citations", value: "5 cited" }, { key: "LLM Model", value: "Mistral-7B (Local)" }],
      },
      {
        step: 6, title: "Validation & Quality Check", icon: "check-circle",
        summary: "Validation passed. Custom evidence package flagged for customs authority referral.",
        details: ["Invoice documentation referenced — PASS", "Customs record inconsistency documented — PASS", "High-risk jurisdiction evidence captured — PASS"],
        outputs: [{ key: "Validation Status", value: "ALL PASS" }, { key: "Checks Performed", value: "6 / 6" }, { key: "Customs Referral", value: "Recommended" }, { key: "Compliance Ready", value: "Yes" }],
      },
    ],
    validation: ["Invoice anomaly documented", "Customs records referenced", "FATF TBML typology matched", "High-risk jurisdiction evidence preserved"],
  },

  normal: {
    id: "CASE-2024-0501",
    type: "normal",
    label: "Normal Case",
    customer: {
      id: "CUST-05521",
      name: "Ananya Singh",
      occupation: "Salaried Employee — IT Sector",
      annualIncome: "₹18,00,000",
      accountType: "Savings Account",
      branch: "Bengaluru — Koramangala",
      since: "Feb 2020",
    },
    transactions: {
      total: 43,
      inflow: "₹16,80,000",
      outflow: "₹15,40,000",
      period: "Jan 2024 – Jun 2024",
      avgTicket: "₹39,070",
    },
    ruleScore: 12,
    redFlags: [{ flag: "No significant red flags identified in review period", severity: "medium" }],
    mlProbability: 8,
    riskLevel: "Low",
    typology: "Normal Transactional Activity",
    narrative: `COMPLIANCE REVIEW SUMMARY — NORMAL CASE

Case Reference: CASE-2024-0501
Reporting Entity: [Bank Name] | Branch: Bengaluru, Koramangala
Review Date: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}

Following comprehensive AML analysis under PMLA 2002 framework, no suspicious activity indicators were identified for account holder Ananya Singh (CUST-05521). Transaction patterns are consistent with declared salary income, with regular periodic salary credits and routine consumer expenditure. No SAR filing obligation identified at this time. Account recommended for standard monitoring cycle.`,
    auditTrail: [
      {
        step: 1, title: "Rule Detection Engine", icon: "shield",
        summary: "23 AML rules evaluated — zero rules triggered. Transaction patterns consistent with legitimate activity.",
        details: ["All 23 rules evaluated", "0 rules triggered", "Transaction amounts consistent with declared income", "Regular salary credit pattern observed"],
        outputs: [{ key: "Rules Evaluated", value: "23" }, { key: "Rules Triggered", value: "0" }, { key: "Rule Confidence Score", value: "12 / 100" }, { key: "Determination", value: "No Suspicion" }],
      },
      {
        step: 2, title: "Feature Engineering", icon: "cpu",
        summary: "Features indicate normal salaried employee behavior profile.",
        details: ["income_transaction_ratio: 0.93x (within normal range)", "transaction_regularity: 0.78 (consistent)", "cash_intensity: 0.04 (low)"],
        outputs: [{ key: "Features Extracted", value: "18" }, { key: "Anomaly Score", value: "0.08" }, { key: "Behavior Profile", value: "Normal" }, { key: "Data Quality", value: "99.1%" }],
      },
      {
        step: 3, title: "ML Inference (Logistic Regression)", icon: "brain",
        summary: "8% probability — well below Low-risk threshold of 30%.",
        details: ["Positive class probability: 0.08 (Low risk threshold: 0.30)", "Classification: NOT SUSPICIOUS", "Confidence high — consistent with training data distribution"],
        outputs: [{ key: "Probability Score", value: "8%" }, { key: "Classification", value: "NOT SUSPICIOUS" }, { key: "Model Version", value: "v2.3.1" }, { key: "Confidence", value: "High" }],
      },
      {
        step: 4, title: "Regulatory Retrieval (RAG)", icon: "database",
        summary: "Standard monitoring guidelines retrieved for documentation purposes.",
        details: ["RBI KYC Master Direction 2016 — Standard monitoring", "PMLA 2002 Section 12 — Record keeping obligation"],
        outputs: [{ key: "Documents Retrieved", value: "2 clauses" }, { key: "Action Required", value: "None" }, { key: "Monitoring Level", value: "Standard" }, { key: "Next Review", value: "12 months" }],
      },
      {
        step: 5, title: "Narrative Generation (LLM)", icon: "file-text",
        summary: "Brief compliance summary generated — no SAR required.",
        details: ["Model: Mistral-7B-Instruct (local)", "Summary narrative generated (no SAR filing needed)", "Normal activity determination documented for records"],
        outputs: [{ key: "Tokens Generated", value: "187" }, { key: "Generation Time", value: "0.9s" }, { key: "SAR Required", value: "No" }, { key: "LLM Model", value: "Mistral-7B (Local)" }],
      },
      {
        step: 6, title: "Validation & Quality Check", icon: "check-circle",
        summary: "Case closed — no suspicious activity. Standard record retention applied.",
        details: ["No SAR obligation confirmed — PASS", "Record retention (5 years) flagged — PASS", "Standard monitoring cycle set — PASS"],
        outputs: [{ key: "Validation Status", value: "CLEARED" }, { key: "SAR Filing", value: "Not Required" }, { key: "Next Review", value: "Dec 2024" }, { key: "Compliance Ready", value: "Closed" }],
      },
    ],
    validation: ["No SAR filing required", "Standard monitoring applied", "Records retained per PMLA requirements"],
  },
};
