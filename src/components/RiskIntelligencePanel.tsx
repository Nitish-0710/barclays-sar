import { AlertTriangle, Activity, Gauge } from "lucide-react";
import { CaseData } from "@/data/mockData";

interface RiskIntelligencePanelProps {
  data: CaseData;
}

const severityBadge = (s: string) => {
  if (s === "critical") return "risk-badge-critical";
  if (s === "high") return "risk-badge-high";
  return "risk-badge-medium";
};

function RiskGauge({ probability, riskLevel }: { probability: number; riskLevel: string }) {
  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // Only use half circle (180 deg)
  const halfCirc = circumference / 2;
  const offset = halfCirc - (probability / 100) * halfCirc;

  const gaugeColor =
    probability >= 80 ? "#ef4444" : probability >= 50 ? "#f97316" : "#22c55e";
  const riskColors: Record<string, string> = {
    Critical: "text-risk-critical",
    High: "text-risk-high",
    Medium: "text-risk-medium",
    Low: "text-risk-low",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <svg
          height={radius + stroke}
          width={radius * 2 + stroke}
          viewBox={`0 0 ${radius * 2 + stroke} ${radius + stroke}`}
        >
          {/* Background arc */}
          <path
            d={`M ${stroke / 2 + normalizedRadius} ${radius + stroke / 2} 
                A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 + stroke / 2} ${radius + stroke / 2}`}
            fill="none"
            stroke="hsl(215 25% 20%)"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          {/* Filled arc */}
          <path
            d={`M ${stroke / 2 + normalizedRadius} ${radius + stroke / 2} 
                A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 + stroke / 2} ${radius + stroke / 2}`}
            fill="none"
            stroke={gaugeColor}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${halfCirc} ${halfCirc}`}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
          />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
          <span className="text-3xl font-bold text-foreground">{probability}%</span>
        </div>
      </div>
      <span className={`text-sm font-semibold ${riskColors[riskLevel] || "text-foreground"}`}>
        {riskLevel} Risk
      </span>
      <span className="text-xs text-muted-foreground text-center">ML Probability Score</span>
    </div>
  );
}

export function RiskIntelligencePanel({ data }: RiskIntelligencePanelProps) {
  const { ruleScore, redFlags, mlProbability, riskLevel } = data;
  const scoreColor =
    ruleScore >= 80 ? "text-risk-critical" : ruleScore >= 60 ? "text-risk-high" : ruleScore >= 40 ? "text-risk-medium" : "text-risk-low";

  const criticalCount = redFlags.filter((f) => f.severity === "critical").length;
  const highCount = redFlags.filter((f) => f.severity === "high").length;
  const mediumCount = redFlags.filter((f) => f.severity === "medium").length;

  return (
    <div className="panel-card animate-fade-in">
      <p className="section-label mb-4">Risk Intelligence</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Column 1: Rule-Based Score */}
        <div className="rounded-md border border-border bg-muted/20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-risk-high" />
            <span className="text-xs font-semibold text-foreground">Rule-Based Detection</span>
          </div>
          <div className="mb-3 flex items-end gap-1">
            <span className={`text-4xl font-bold ${scoreColor}`}>{ruleScore}</span>
            <span className="text-lg text-muted-foreground mb-1">/100</span>
          </div>
          {/* Progress bar */}
          <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${ruleScore}%`,
                background: ruleScore >= 80 ? "hsl(var(--risk-critical))" : ruleScore >= 60 ? "hsl(var(--risk-high))" : "hsl(var(--risk-low))",
              }}
            />
          </div>
          <div className="mb-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Severity Breakdown</p>
            <div className="flex flex-wrap gap-1.5">
              {criticalCount > 0 && <span className="risk-badge-critical">{criticalCount} Critical</span>}
              {highCount > 0 && <span className="risk-badge-high">{highCount} High</span>}
              {mediumCount > 0 && <span className="risk-badge-medium">{mediumCount} Medium</span>}
            </div>
          </div>
          <div className="space-y-2 mt-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Red Flags Detected</p>
            {redFlags.map((flag, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                  flag.severity === "critical" ? "bg-risk-critical" : flag.severity === "high" ? "bg-risk-high" : "bg-risk-medium"
                }`} />
                <p className="text-[11px] text-muted-foreground leading-tight">{flag.flag}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: ML Probability */}
        <div className="rounded-md border border-border bg-muted/20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-foreground">ML Risk Assessment</span>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Model</p>
              <p className="text-xs font-medium text-foreground">Logistic Regression v2.3.1</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Training Set</p>
              <p className="text-xs font-medium text-foreground">12,500 historical SAR cases</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Model Accuracy</p>
              <p className="text-xs font-medium text-foreground">91.3% | AUC-ROC: 0.94</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Typology</p>
              <p className="text-xs font-semibold text-primary">{data.typology}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Classification</p>
              <span className={severityBadge(mlProbability >= 80 ? "critical" : mlProbability >= 50 ? "high" : "medium")}>
                {mlProbability >= 70 ? "SUSPICIOUS" : mlProbability >= 30 ? "REVIEW REQUIRED" : "NOT SUSPICIOUS"}
              </span>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Feature Importance</p>
              <p className="text-xs text-muted-foreground">cash_deposit_frequency, income_ratio, velocity</p>
            </div>
          </div>
        </div>

        {/* Column 3: Gauge */}
        <div className="rounded-md border border-border bg-muted/20 p-4 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-4 self-start">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-semibold text-foreground">Risk Visualization</span>
          </div>
          <RiskGauge probability={mlProbability} riskLevel={riskLevel} />

          {/* Scale legend */}
          <div className="mt-4 w-full">
            <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
              <span>Critical</span>
            </div>
            <div className="flex h-1.5 w-full overflow-hidden rounded-full">
              <div className="flex-1 bg-risk-low" />
              <div className="flex-1 bg-risk-medium" />
              <div className="flex-1 bg-risk-high" />
              <div className="flex-1 bg-risk-critical" />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>0</span>
              <span>30</span>
              <span>70</span>
              <span>85</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
