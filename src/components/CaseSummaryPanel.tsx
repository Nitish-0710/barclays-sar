import { User, Briefcase, Banknote, ArrowUpRight, ArrowDownLeft, Hash, CalendarDays, Building } from "lucide-react";
import { CaseData } from "@/data/mockData";

interface CaseSummaryPanelProps {
  data: CaseData;
}

export function CaseSummaryPanel({ data }: CaseSummaryPanelProps) {
  const { customer, transactions } = data;

  const stats = [
    { label: "Total Transactions", value: String(transactions.total), icon: Hash, color: "text-primary" },
    { label: "Total Inflow", value: transactions.inflow, icon: ArrowDownLeft, color: "text-risk-low" },
    { label: "Total Outflow", value: transactions.outflow, icon: ArrowUpRight, color: "text-risk-high" },
    { label: "Avg. Ticket Size", value: transactions.avgTicket, icon: Banknote, color: "text-muted-foreground" },
  ];

  return (
    <div className="panel-card animate-fade-in">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="section-label mb-1">Case Summary</p>
          <h2 className="text-base font-semibold text-foreground">{customer.name}</h2>
        </div>
        <span className="font-mono text-xs text-muted-foreground">{data.id}</span>
      </div>

      {/* Customer Details */}
      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-3">
        <Detail icon={User} label="Customer ID" value={customer.id} />
        <Detail icon={Briefcase} label="Occupation" value={customer.occupation} />
        <Detail icon={Banknote} label="Annual Income" value={customer.annualIncome} />
        <Detail icon={Building} label="Account Type" value={customer.accountType} />
        <Detail icon={Building} label="Branch" value={customer.branch} />
        <Detail icon={CalendarDays} label="Period" value={transactions.period} />
      </div>

      {/* Transaction Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-md border border-border bg-muted/30 p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Icon className={`h-3.5 w-3.5 ${color}`} />
              <span className="stat-label">{label}</span>
            </div>
            <p className={`text-lg font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Detail({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      <div>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-xs font-medium text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  );
}
