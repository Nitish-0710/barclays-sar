import { useState } from "react";
import { TrendingDown, Clock, Calculator } from "lucide-react";

export function BusinessImpactPanel() {
  const [sarCount, setSarCount] = useState(2000);
  const manualHoursPerSar = 5.5;
  const aiMinutesPerSar = 4;

  const hoursSaved = sarCount * manualHoursPerSar - (sarCount * aiMinutesPerSar) / 60;
  const daysSaved = Math.round(hoursSaved / 8);
  const costSaved = Math.round(hoursSaved * 1500); // ₹1500/hr analyst cost

  const comparisons = [
    {
      metric: "Time per SAR",
      manual: "5–6 hours",
      ai: "< 5 minutes",
      improvement: "98% faster",
      improvementColor: "text-risk-low",
    },
    {
      metric: "Documentation",
      manual: "Manual, error-prone",
      ai: "Automated, standardized",
      improvement: "Consistent",
      improvementColor: "text-primary",
    },
    {
      metric: "Analyst Dependency",
      manual: "Heavily analyst-dependent",
      ai: "AI-assisted, standardized",
      improvement: "Reduced bias",
      improvementColor: "text-primary",
    },
    {
      metric: "Audit Trail",
      manual: "Manual notes, incomplete",
      ai: "Full AI reasoning chain",
      improvement: "100% transparent",
      improvementColor: "text-risk-low",
    },
    {
      metric: "Regulatory Grounding",
      manual: "Analyst recall",
      ai: "RAG-based PMLA citations",
      improvement: "Always accurate",
      improvementColor: "text-risk-low",
    },
    {
      metric: "Error Rate",
      manual: "~15% require rework",
      ai: "< 2% post-validation",
      improvement: "87% reduction",
      improvementColor: "text-risk-low",
    },
  ];

  return (
    <div className="panel-card animate-fade-in">
      <div className="mb-4 flex items-center gap-2">
        <TrendingDown className="h-4 w-4 text-primary" />
        <p className="section-label">Business Impact</p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Comparison Table */}
        <div>
          <p className="text-xs font-semibold text-foreground mb-3">Manual Process vs. AI-Assisted</p>
          <div className="overflow-hidden rounded-md border border-border">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Metric</th>
                  <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Manual</th>
                  <th className="px-3 py-2 text-left font-semibold text-muted-foreground">AI-Assisted</th>
                  <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Gain</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr
                    key={row.metric}
                    className={`border-b border-border/60 transition-colors ${i % 2 === 0 ? "bg-navy-950/50" : ""}`}
                  >
                    <td className="px-3 py-2 font-medium text-foreground">{row.metric}</td>
                    <td className="px-3 py-2 text-risk-high">{row.manual}</td>
                    <td className="px-3 py-2 text-risk-low">{row.ai}</td>
                    <td className={`px-3 py-2 font-semibold ${row.improvementColor}`}>{row.improvement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calculator */}
        <div className="flex flex-col gap-4">
          <div className="rounded-md border border-border bg-muted/20 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="h-4 w-4 text-primary" />
              <p className="text-xs font-semibold text-foreground">Efficiency Calculator</p>
            </div>

            <div className="mb-4">
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Annual SAR Volume
              </label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="range"
                  min={100}
                  max={10000}
                  step={100}
                  value={sarCount}
                  onChange={(e) => setSarCount(Number(e.target.value))}
                  className="flex-1 accent-primary"
                />
                <span className="font-mono text-sm font-bold text-primary w-16 text-right">
                  {sarCount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-md border border-risk-low/30 bg-risk-low/10 p-3 text-center">
                <Clock className="h-4 w-4 text-risk-low mx-auto mb-1" />
                <p className="text-lg font-bold text-risk-low">{Math.round(hoursSaved).toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">Hours Saved</p>
              </div>
              <div className="rounded-md border border-primary/30 bg-primary/10 p-3 text-center">
                <TrendingDown className="h-4 w-4 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold text-primary">{daysSaved.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">FTE Days Saved</p>
              </div>
              <div className="rounded-md border border-risk-medium/30 bg-risk-medium/10 p-3 text-center">
                <span className="text-risk-medium text-sm font-bold block mb-1">₹</span>
                <p className="text-lg font-bold text-risk-medium">{(costSaved / 100000).toFixed(1)}L</p>
                <p className="text-[10px] text-muted-foreground">Est. Cost Saving</p>
              </div>
            </div>

            <div className="mt-3 rounded-md bg-navy-950 border border-border p-3">
              <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                <span className="text-primary font-semibold">{sarCount.toLocaleString()} SARs/yr</span> ×{" "}
                <span className="text-foreground">5.5 hrs manual</span> → reduces to{" "}
                <span className="text-risk-low font-semibold">{Math.round((sarCount * aiMinutesPerSar) / 60)} hrs AI-assisted</span>
                {" "}· Saving{" "}
                <span className="text-risk-low font-semibold">{Math.round(hoursSaved).toLocaleString()} hrs/yr</span>
              </p>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md border border-border bg-muted/20 p-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Regulatory Compliance</p>
              <p className="text-sm font-bold text-risk-low">100%</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">PMLA 2002 + FIU-IND</p>
            </div>
            <div className="rounded-md border border-border bg-muted/20 p-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Audit Completeness</p>
              <p className="text-sm font-bold text-primary">6-Step Trail</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Full AI reasoning captured</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
