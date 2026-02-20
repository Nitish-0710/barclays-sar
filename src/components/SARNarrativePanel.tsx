import { useState } from "react";
import { FileText, CheckCircle, Download, Edit3 } from "lucide-react";
import { CaseData } from "@/data/mockData";

interface SARNarrativePanelProps {
  data: CaseData;
  onApprove: () => void;
  approved: boolean;
}

export function SARNarrativePanel({ data, onApprove, approved }: SARNarrativePanelProps) {
  const [narrative, setNarrative] = useState(data.narrative);
  const [editing, setEditing] = useState(false);

  // Reset when case changes
  if (narrative !== data.narrative && !editing) {
    setNarrative(data.narrative);
  }

  const handleDownload = () => {
    const blob = new Blob([narrative], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.id}_SAR_Narrative.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="panel-card animate-fade-in">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          <p className="section-label">Generated SAR Narrative</p>
          {approved && (
            <span className="inline-flex items-center gap-1 rounded border border-risk-low/40 bg-risk-low/10 px-2 py-0.5 text-[10px] font-semibold text-risk-low">
              <CheckCircle className="h-2.5 w-2.5" /> Approved
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditing(!editing)}
            className="btn-outline text-xs py-1.5 px-3"
          >
            <Edit3 className="h-3.5 w-3.5" />
            {editing ? "Done Editing" : "Edit Narrative"}
          </button>
        </div>
      </div>

      {/* Narrative Editor */}
      <div className="relative mb-4">
        {editing ? (
          <textarea
            value={narrative}
            onChange={(e) => setNarrative(e.target.value)}
            className="h-72 w-full resize-y rounded-md border border-primary/50 bg-navy-950 p-4 font-mono text-xs leading-relaxed text-foreground outline-none ring-1 ring-primary/30 focus:ring-primary/60 transition-all"
          />
        ) : (
          <div className="h-72 overflow-y-auto rounded-md border border-border bg-navy-950 p-4">
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground/85">{narrative}</pre>
          </div>
        )}
        <div className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded bg-navy-800 px-2 py-0.5">
          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="text-[10px] font-mono text-muted-foreground">AI Generated · Mistral-7B</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        {!approved ? (
          <button onClick={onApprove} className="btn-success">
            <CheckCircle className="h-4 w-4" />
            Approve SAR
          </button>
        ) : (
          <button disabled className="inline-flex items-center gap-2 rounded-md bg-risk-low/20 px-4 py-2 text-sm font-semibold text-risk-low cursor-default border border-risk-low/30">
            <CheckCircle className="h-4 w-4" />
            SAR Approved
          </button>
        )}
        <button onClick={handleDownload} className="btn-outline">
          <Download className="h-4 w-4" />
          Download Report
        </button>
        <p className="ml-auto text-[10px] text-muted-foreground">
          PMLA 2002 · Section 12 · FIU-IND STR Format
        </p>
      </div>
    </div>
  );
}
