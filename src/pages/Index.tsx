// import { useState } from "react";
// import { AppHeader } from "@/components/AppHeader";
// import { AppSidebar } from "@/components/AppSidebar";
// import { CaseSummaryPanel } from "@/components/CaseSummaryPanel";
// import { RiskIntelligencePanel } from "@/components/RiskIntelligencePanel";
// import { SARNarrativePanel } from "@/components/SARNarrativePanel";
// import { AuditTrailPanel } from "@/components/AuditTrailPanel";
// import { BusinessImpactPanel } from "@/components/BusinessImpactPanel";
// import { CASES, CaseType } from "@/data/mockData";

// const Index = () => {
//   const [selectedCase, setSelectedCase] = useState<CaseType>("structuring");
//   const [isRunning, setIsRunning] = useState(false);
//   const [analysisRun, setAnalysisRun] = useState(true);
//   const [approved, setApproved] = useState(false);

//   const caseData = CASES[selectedCase];

//   const handleSelectCase = (c: CaseType) => {
//     setSelectedCase(c);
//     setAnalysisRun(false);
//     setApproved(false);
//   };

//   const handleRunAnalysis = () => {
//     setIsRunning(true);
//     setAnalysisRun(false);
//     setTimeout(() => {
//       setIsRunning(false);
//       setAnalysisRun(true);
//     }, 1800);
//   };

//   return (
//     <div className="flex min-h-screen flex-col bg-background">
//       <AppHeader caseId={caseData.id} status={approved ? "approved" : "pending"} />

//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <AppSidebar
//           selectedCase={selectedCase}
//           onSelectCase={handleSelectCase}
//           onRunAnalysis={handleRunAnalysis}
//           isRunning={isRunning}
//         />

//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto">
//           {isRunning ? (
//             <LoadingState />
//           ) : !analysisRun ? (
//             <EmptyState onRun={handleRunAnalysis} caseLabel={caseData.label} />
//           ) : (
//             <div className="space-y-4 p-5 max-w-[1400px]">
//               {/* Case Summary */}
//               <CaseSummaryPanel data={caseData} />

//               {/* Risk Intelligence */}
//               <RiskIntelligencePanel data={caseData} />

//               {/* SAR Narrative */}
//               <SARNarrativePanel
//                 data={caseData}
//                 onApprove={() => setApproved(true)}
//                 approved={approved}
//               />

//               {/* Audit Trail */}
//               <AuditTrailPanel steps={caseData.auditTrail} />

//               {/* Business Impact */}
//               <BusinessImpactPanel />

//               {/* Footer */}
//               <div className="border-t border-border pt-4 pb-6">
//                 <p className="text-center text-[11px] text-muted-foreground">
//                   SAR Narrative Generator · AI-Powered AML Compliance Intelligence ·{" "}
//                   <span className="text-primary font-medium">PMLA 2002 · FIU-IND</span> ·{" "}
//                   Built for banking compliance hackathon demo
//                 </p>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// function LoadingState() {
//   const steps = [
//     "Fetching transaction records...",
//     "Running AML rule engine (23 rules)...",
//     "Engineering ML features...",
//     "Running Logistic Regression inference...",
//     "Retrieving regulatory context (RAG)...",
//     "Generating SAR narrative (Mistral-7B)...",
//     "Validating output...",
//   ];

//   return (
//     <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 p-8">
//       <div className="flex flex-col items-center gap-4 w-full max-w-sm">
//         <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/30">
//           <div className="h-7 w-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
//         </div>
//         <div className="text-center">
//           <h3 className="text-base font-semibold text-foreground">Running Analysis Pipeline</h3>
//           <p className="text-xs text-muted-foreground mt-1">AI + Rules + RAG + LLM</p>
//         </div>
//         <div className="w-full space-y-1.5 mt-2">
//           {steps.map((step, i) => (
//             <div key={step} className="flex items-center gap-2.5 rounded-md border border-border bg-card px-3 py-2">
//               <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
//               <span className="font-mono text-[11px] text-muted-foreground">{step}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function EmptyState({ onRun, caseLabel }: { onRun: () => void; caseLabel: string }) {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 p-8">
//       <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-border bg-card">
//         <div className="h-8 w-8 rounded-full border-2 border-dashed border-muted-foreground" />
//       </div>
//       <div className="text-center max-w-xs">
//         <h3 className="text-base font-semibold text-foreground">Ready to Analyse</h3>
//         <p className="text-xs text-muted-foreground mt-1">
//           Case selected: <span className="text-primary font-medium">{caseLabel}</span>. Click Run Analysis to execute the full AML pipeline.
//         </p>
//       </div>
//       <button onClick={onRun} className="btn-primary mt-2">
//         Run Analysis
//       </button>
//     </div>
//   );
// }

// export default Index;


import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { CaseSummaryPanel } from "@/components/CaseSummaryPanel";
import { RiskIntelligencePanel } from "@/components/RiskIntelligencePanel";
import { SARNarrativePanel } from "@/components/SARNarrativePanel";
import { AuditTrailPanel } from "@/components/AuditTrailPanel";
import { BusinessImpactPanel } from "@/components/BusinessImpactPanel";
import { CASES, CaseType, CaseData } from "@/data/mockData";

const Index = () => {
  const [selectedCase, setSelectedCase] = useState<CaseType>("structuring");
  const [isRunning, setIsRunning] = useState(false);
  const [analysisRun, setAnalysisRun] = useState(true);
  const [approved, setApproved] = useState(false);
  const [apiData, setApiData] = useState<CaseData | null>(null);

  const caseData = apiData ?? CASES[selectedCase];

  const handleSelectCase = (c: CaseType) => {
    setSelectedCase(c);
    setApiData(null);
    setAnalysisRun(false);
    setApproved(false);
  };

  const handleRunAnalysis = async () => {
    setIsRunning(true);
    setAnalysisRun(false);
    setApproved(false);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getCaseInput(selectedCase)),
      });

      const data = await response.json();

      const mapped: CaseData = mapBackendToCaseData(data, selectedCase);

      setApiData(mapped);
      setAnalysisRun(true);
    } catch (err) {
      console.error("API Error:", err);
    }

    setIsRunning(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader caseId={caseData.id} status={approved ? "approved" : "pending"} />

      <div className="flex flex-1 overflow-hidden">
        <AppSidebar
          selectedCase={selectedCase}
          onSelectCase={handleSelectCase}
          onRunAnalysis={handleRunAnalysis}
          isRunning={isRunning}
        />

        <main className="flex-1 overflow-y-auto">
          {isRunning ? (
            <LoadingState />
          ) : !analysisRun ? (
            <EmptyState onRun={handleRunAnalysis} caseLabel={caseData.label} />
          ) : (
            <div className="space-y-4 p-5 max-w-[1400px]">
              <CaseSummaryPanel data={caseData} />
              <RiskIntelligencePanel data={caseData} />
              <SARNarrativePanel
                data={caseData}
                onApprove={() => setApproved(true)}
                approved={approved}
              />
              <AuditTrailPanel steps={caseData.auditTrail} />
              <BusinessImpactPanel />

              <div className="border-t border-border pt-4 pb-6">
                <p className="text-center text-[11px] text-muted-foreground">
                  SAR Narrative Generator · AI-Powered AML Compliance Intelligence ·{" "}
                  <span className="text-primary font-medium">
                    PMLA 2002 · FIU-IND
                  </span>{" "}
                  · Built for banking compliance hackathon demo
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

/* ===============================
   BACKEND INPUT PER CASE TYPE
=================================*/

function getCaseInput(type: CaseType) {
  switch (type) {
    case "structuring":
      return {
        unique_senders_7d: 40,
        inflow_outflow_ratio: 4.0,
        transaction_velocity: 18,
        cash_deposit_ratio: 0.8,
        foreign_transfer_flag: 1,
        avg_amount_deviation: 2.5,
      };

    case "layering":
      return {
        unique_senders_7d: 55,
        inflow_outflow_ratio: 3.8,
        transaction_velocity: 22,
        cash_deposit_ratio: 0.3,
        foreign_transfer_flag: 1,
        avg_amount_deviation: 3.2,
      };

    case "trade_based":
      return {
        unique_senders_7d: 25,
        inflow_outflow_ratio: 2.7,
        transaction_velocity: 12,
        cash_deposit_ratio: 0.4,
        foreign_transfer_flag: 1,
        avg_amount_deviation: 1.9,
      };

    case "normal":
    default:
      return {
        unique_senders_7d: 2,
        inflow_outflow_ratio: 1.1,
        transaction_velocity: 3,
        cash_deposit_ratio: 0.2,
        foreign_transfer_flag: 0,
        avg_amount_deviation: 0.3,
      };
  }
}

/* ===============================
   BACKEND → FRONTEND MAPPING
=================================*/

function mapBackendToCaseData(data: any, type: CaseType): CaseData {
  const riskLevel =
    data.risk_band as "Critical" | "High" | "Medium" | "Low";

  const redFlags = (data.rule_flags || []).map((r: any) => ({
    flag: r.name,
    severity:
      r.severity >= 20
        ? "critical"
        : r.severity >= 15
        ? "high"
        : "medium",
  }));

  const auditTrail = (data.audit_trail || []).map(
    (step: any, i: number) => ({
      step: i + 1,
      title: step.step,
      icon: "shield",
      summary:
        typeof step.details === "string"
          ? step.details
          : "AI reasoning step",
      details:
        typeof step.details === "object"
          ? Object.entries(step.details).map(
              ([k, v]) => `${k}: ${JSON.stringify(v)}`
            )
          : [],
      outputs: [],
    })
  );

  return {
    id: `LIVE-${Date.now()}`,
    type,
    label: "Live API Case",
    customer: CASES[type].customer,
    transactions: CASES[type].transactions,
    ruleScore: data.rule_score,
    redFlags,
    mlProbability: Math.round(data.ml_probability * 100),
    riskLevel,
    typology: data.typology,
    narrative: data.narrative,
    auditTrail,
    validation: data.validation?.issues || [],
  };
}

/* ===============================
   LOADING STATE
=================================*/

function LoadingState() {
  const steps = [
    "Fetching transaction records...",
    "Running AML rule engine...",
    "Engineering ML features...",
    "Running Logistic Regression inference...",
    "Retrieving regulatory context (RAG)...",
    "Generating SAR narrative...",
    "Validating output...",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 p-8">
      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/30">
          <div className="h-7 w-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
        <div className="text-center">
          <h3 className="text-base font-semibold text-foreground">
            Running Analysis Pipeline
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            AI + Rules + RAG + LLM
          </p>
        </div>
        <div className="w-full space-y-1.5 mt-2">
          {steps.map((step, i) => (
            <div
              key={step}
              className="flex items-center gap-2.5 rounded-md border border-border bg-card px-3 py-2"
            >
              <div
                className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
              <span className="font-mono text-[11px] text-muted-foreground">
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===============================
   EMPTY STATE
=================================*/

function EmptyState({
  onRun,
  caseLabel,
}: {
  onRun: () => void;
  caseLabel: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 p-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-border bg-card">
        <div className="h-8 w-8 rounded-full border-2 border-dashed border-muted-foreground" />
      </div>
      <div className="text-center max-w-xs">
        <h3 className="text-base font-semibold text-foreground">
          Ready to Analyse
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Case selected:{" "}
          <span className="text-primary font-medium">{caseLabel}</span>.
          Click Run Analysis to execute the full AML pipeline.
        </p>
      </div>
      <button onClick={onRun} className="btn-primary mt-2">
        Run Analysis
      </button>
    </div>
  );
}

export default Index;
