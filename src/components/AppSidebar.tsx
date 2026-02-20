import { ShieldAlert, Layers, Package, CheckCircle, Play } from "lucide-react";
import { CaseType } from "@/data/mockData";

interface SidebarProps {
  selectedCase: CaseType;
  onSelectCase: (c: CaseType) => void;
  onRunAnalysis: () => void;
  isRunning: boolean;
}

const CASES: { type: CaseType; label: string; sublabel: string; icon: React.ElementType; risk: string }[] = [
  { type: "structuring", label: "Structuring", sublabel: "Smurfing Pattern", icon: ShieldAlert, risk: "High" },
  { type: "layering", label: "Layering", sublabel: "Shell Entities", icon: Layers, risk: "Critical" },
  { type: "trade_based", label: "Trade-Based", sublabel: "TBML Pattern", icon: Package, risk: "High" },
  { type: "normal", label: "Normal Case", sublabel: "No Suspicion", icon: CheckCircle, risk: "Low" },
];

const riskColor: Record<string, string> = {
  Critical: "text-risk-critical",
  High: "text-risk-high",
  Medium: "text-risk-medium",
  Low: "text-risk-low",
};

export function AppSidebar({ selectedCase, onSelectCase, onRunAnalysis, isRunning }: SidebarProps) {
  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-navy-900">
      {/* Title */}
      <div className="border-b border-border px-5 py-4">
        <p className="section-label mb-1">Case Selector</p>
        <p className="text-xs text-muted-foreground">Select typology to analyse</p>
      </div>

      {/* Case List */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {CASES.map(({ type, label, sublabel, icon: Icon, risk }) => {
          const active = selectedCase === type;
          return (
            <button
              key={type}
              onClick={() => onSelectCase(type)}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-all ${
                active
                  ? "bg-primary/15 border border-primary/30 text-foreground"
                  : "border border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${active ? "text-primary" : ""}`} />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium leading-none">{label}</div>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="text-[10px] text-muted-foreground">{sublabel}</span>
                  <span className={`text-[10px] font-semibold ${riskColor[risk]}`}>· {risk}</span>
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Run Analysis Button */}
      <div className="border-t border-border p-4">
        <button
          onClick={onRunAnalysis}
          disabled={isRunning}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-steel-blue-dark disabled:opacity-60 active:scale-95"
        >
          <Play className={`h-4 w-4 ${isRunning ? "animate-spin" : ""}`} />
          {isRunning ? "Running Analysis..." : "Run Analysis"}
        </button>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          FastAPI ML Service · Local LLM
        </p>
      </div>
    </aside>
  );
}
