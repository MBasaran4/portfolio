import * as React from "react";
import { Layers, Activity, Binary, Terminal } from "lucide-react";

interface ProjectVisualPreviewProps {
  type: "code" | "architecture" | "signal";
  title: string;
  badgeText?: string;
  schematicText?: string;
  illustrativeText?: string;
}

export function ProjectVisualPreview({
  type,
  title,
  badgeText = "Technical Preview",
  schematicText = "Architectural Schematic",
  illustrativeText = "Illustrative Preview",
}: ProjectVisualPreviewProps) {
  return (
    <div className="w-full h-full min-h-[260px] sm:min-h-[320px] rounded-sm bg-[#0d121c] border border-[rgba(6,182,212,0.15)] flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden font-mono select-none group">
      {/* Decorative ambient corner glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(6,182,212,0.06)] rounded-full blur-2xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-3 z-10">
        <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/60 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/60 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/60 inline-block" />
          <span className="ml-2 text-[11px] text-[#64748b]">
            sys://{title.toLowerCase().replace(/\s+/g, "-")}
          </span>
        </div>
        <span className="text-[10px] text-[#06b6d4] tracking-widest uppercase bg-[rgba(6,182,212,0.08)] px-2 py-0.5 rounded border border-[rgba(6,182,212,0.2)]">
          {badgeText}
        </span>
      </div>

      {/* Center Graphic based on project type */}
      <div className="my-auto py-6 flex flex-col items-center justify-center z-10">
        {type === "code" && (
          <div className="w-full max-w-sm space-y-2 text-[11px] text-[#94a3b8] leading-relaxed bg-[#090b10]/90 p-4 rounded border border-[rgba(6,182,212,0.1)]">
            <div className="flex items-center gap-2 text-[#06b6d4] pb-1 border-b border-[rgba(255,255,255,0.04)]">
              <Terminal className="w-3.5 h-3.5" />
              <span>calculator.module.ts</span>
            </div>
            <p className="text-[#64748b]">
              {"// Modular calculation engine interface"}
            </p>
            <p className="text-[#00f5d4]">
              <span className="text-[#06b6d4]">export interface</span> CalculatorUnit{" "}
              {"{"}
            </p>
            <p className="pl-4 text-[#94a3b8]">
              id: <span className="text-[#38bdf8]">string</span>;
            </p>
            <p className="pl-4 text-[#94a3b8]">
              compute: (input: <span className="text-[#38bdf8]">TInput</span>) =&gt;{" "}
              <span className="text-[#38bdf8]">TResult</span>;
            </p>
            <p className="pl-4 text-[#94a3b8]">
              i18nBundle:{" "}
              <span className="text-[#38bdf8]">Record&lt;string, string&gt;</span>;
            </p>
            <p className="text-[#00f5d4]">{"}"}</p>
          </div>
        )}

        {type === "architecture" && (
          <div className="w-full max-w-md flex flex-col items-center gap-3">
            <div className="grid grid-cols-3 gap-2 w-full text-center text-[10px]">
              <div className="p-2.5 rounded bg-[#090b10] border border-[rgba(6,182,212,0.2)] text-[#06b6d4]">
                <Layers className="w-3.5 h-3.5 mx-auto mb-1 text-[#06b6d4]" />
                Agent Pipeline
              </div>
              <div className="p-2.5 rounded bg-[#090b10] border border-[rgba(0,245,212,0.25)] text-[#00f5d4]">
                <Binary className="w-3.5 h-3.5 mx-auto mb-1 text-[#00f5d4]" />
                Security Harness
              </div>
              <div className="p-2.5 rounded bg-[#090b10] border border-[rgba(20,184,166,0.2)] text-[#14b8a6]">
                <Activity className="w-3.5 h-3.5 mx-auto mb-1 text-[#14b8a6]" />
                CI/CD Gate
              </div>
            </div>
            <div className="w-full px-4 py-2 rounded bg-[#090b10]/60 border border-[rgba(255,255,255,0.05)] text-[10px] text-[#64748b] text-center">
              Reliability Benchmarking &amp; Evaluation Matrix
            </div>
          </div>
        )}

        {type === "signal" && (
          <div className="w-full max-w-sm flex flex-col items-center gap-2">
            {/* SVG Acoustic Signal Waves */}
            <div className="w-full h-16 bg-[#090b10] rounded border border-[rgba(6,182,212,0.15)] flex items-center px-2 relative overflow-hidden">
              <svg
                className="w-full h-12 text-[#06b6d4]"
                viewBox="0 0 300 50"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,25 Q15,5 30,25 T60,25 T90,42 T120,8 T150,38 T180,12 T210,32 T240,18 T270,28 T300,25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M0,25 Q15,18 30,25 T60,10 T90,32 T120,20 T150,28 T180,22 T210,26 T240,24 T270,25 T300,25"
                  stroke="#00f5d4"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
              </svg>
            </div>
            <div className="flex items-center justify-between w-full text-[10px] text-[#64748b]">
              <span>MFCC Feature Extraction</span>
              <span className="text-[#06b6d4]">Acoustic Classifier</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer disclaimer */}
      <div className="pt-2 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-between text-[10px] text-[#64748b] z-10">
        <span>{schematicText}</span>
        <span>{illustrativeText}</span>
      </div>
    </div>
  );
}
