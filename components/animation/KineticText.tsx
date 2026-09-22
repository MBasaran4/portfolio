import * as React from "react";
import { Dictionary } from "@/lib/i18n/types";

interface KineticTextProps {
  dict?: Dictionary["kinetic"];
}

export function KineticText({ dict }: KineticTextProps) {
  const text =
    dict?.text ||
    "SYSTEMS · ARCHITECTURE · SOFTWARE · INTELLIGENCE · ALGORITHMS ·";

  return (
    <div
      className="py-12 overflow-hidden border-y border-[rgba(6,182,212,0.1)] bg-[#090b10]/80 select-none pointer-events-none"
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap text-4xl sm:text-6xl md:text-7xl font-mono font-black tracking-tighter opacity-15">
        <span
          className="text-transparent"
          style={{ WebkitTextStroke: "1px #06b6d4" }}
        >
          {text}
        </span>
        <span
          className="text-transparent pl-4"
          style={{ WebkitTextStroke: "1px #00f5d4" }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
