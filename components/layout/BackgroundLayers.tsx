import * as React from "react";
import { ReactiveBackground } from "@/components/layout/ReactiveBackground";

export function BackgroundLayers() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary ambient radial light gradient */}
      <div className="absolute inset-0 ambient-radial-glow" />

      {/* Subtle secondary teal ambient glow */}
      <div
        className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-20 blur-[130px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(20,184,166,0.15) 50%, transparent 80%)",
        }}
      />

      {/* Reactive living particle field (subtle neural/organic canvas) */}
      <ReactiveBackground />

      {/* Technical grid overlay */}
      <div className="absolute inset-0 technical-grid opacity-60" />

      {/* Top subtle fade gradient to darken boundaries */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090b10] via-transparent to-[#090b10] opacity-80" />
    </div>
  );
}
