import { useState } from "react";
import { Shield, Cpu, Brain, Database, FileText, CheckCircle, ChevronDown } from "lucide-react";
import { AuditStep } from "@/data/mockData";

interface AuditTrailPanelProps {
  steps: AuditStep[];
}

const STEP_ICONS: Record<string, React.ElementType> = {
  shield: Shield,
  cpu: Cpu,
  brain: Brain,
  database: Database,
  "file-text": FileText,
  "check-circle": CheckCircle,
};

const STEP_COLORS = [
  "border-l-primary",
  "border-l-steel-blue-light",
  "border-l-risk-medium",
  "border-l-risk-high",
  "border-l-risk-low",
  "border-l-risk-low",
];

export function AuditTrailPanel({ steps }: AuditTrailPanelProps) {
  const [openSteps, setOpenSteps] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) => {
    setOpenSteps((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const expandAll = () => setOpenSteps(new Set(steps.map((_, i) => i)));
  const collapseAll = () => setOpenSteps(new Set());

  return (
    <div className="panel-card animate-fade-in">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="section-label mb-1">Audit Trail</p>
          <p className="text-xs text-muted-foreground">Complete reasoning chain · {steps.length} steps · Fully explainable AI</p>
        </div>
        <div className="flex gap-2">
          <button onClick={expandAll} className="btn-outline text-[11px] py-1 px-2.5">Expand All</button>
          <button onClick={collapseAll} className="btn-outline text-[11px] py-1 px-2.5">Collapse All</button>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {steps.map((step, i) => {
          const Icon = STEP_ICONS[step.icon] || Shield;
          const isOpen = openSteps.has(i);
          const borderColor = STEP_COLORS[i] || "border-l-primary";

          return (
            <div
              key={step.step}
              className={`audit-step border-l-2 ${borderColor} overflow-hidden transition-all`}
            >
              {/* Step Header */}
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-navy-700/30 transition-colors"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-secondary border border-border">
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground">STEP {step.step}</span>
                    <span className="text-sm font-semibold text-foreground">{step.title}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground truncate">{step.summary}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {/* Quick outputs chips */}
                  {step.outputs.slice(0, 1).map((o) => (
                    <span key={o.key} className="hidden sm:flex items-center gap-1 rounded bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-mono">
                      <span className="text-muted-foreground">{o.key}:</span>
                      <span className="text-primary font-semibold">{o.value}</span>
                    </span>
                  ))}
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {/* Step Content */}
              {isOpen && (
                <div className="border-t border-border px-4 pb-4 pt-3 animate-fade-in">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Reasoning Details */}
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Reasoning Details</p>
                      <div className="space-y-1.5">
                        {step.details.map((detail, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                            <p className="font-mono text-[11px] text-foreground/80 leading-relaxed">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Outputs */}
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Key Outputs</p>
                      <div className="space-y-2">
                        {step.outputs.map((output) => (
                          <div key={output.key} className="flex items-center justify-between rounded-md border border-border bg-navy-950 px-3 py-2">
                            <span className="text-[11px] text-muted-foreground">{output.key}</span>
                            <span className="font-mono text-[11px] font-semibold text-foreground">{output.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
