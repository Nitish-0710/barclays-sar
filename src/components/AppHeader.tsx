import { ShieldCheck, AlertTriangle } from "lucide-react";

interface AppHeaderProps {
  caseId: string;
  status: "pending" | "approved";
}

export function AppHeader({ caseId, status }: AppHeaderProps) {
  return (
    <header className="header-gradient sticky top-0 z-50 w-full">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left: Branding */}
        <div className="flex items-center gap-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <ShieldCheck className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-none text-foreground tracking-tight">
              SAR Narrative Generator
            </h1>
            <p className="mt-0.5 text-[10px] text-muted-foreground font-medium tracking-wide uppercase">
              AI-Powered AML Compliance Intelligence Engine
            </p>
          </div>
        </div>

        {/* Center: Regulatory Badge */}
        <div className="hidden md:flex items-center gap-2 rounded-md border border-border bg-navy-800 px-4 py-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-risk-low animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground tracking-wide">
            Built for PMLA 2002 &amp; FIU-IND Reporting
          </span>
        </div>

        {/* Right: Status + Case ID */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Active Case</span>
            <span className="text-xs font-mono font-semibold text-primary">{caseId}</span>
          </div>
          {status === "approved" ? (
            <span className="inline-flex items-center gap-1.5 rounded border border-risk-low/40 bg-risk-low/10 px-3 py-1 text-xs font-semibold text-risk-low">
              <ShieldCheck className="h-3 w-3" />
              Approved
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded border border-risk-medium/40 bg-risk-medium/10 px-3 py-1 text-xs font-semibold text-risk-medium">
              <AlertTriangle className="h-3 w-3" />
              Pending Review
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
