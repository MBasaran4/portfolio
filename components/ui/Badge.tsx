import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "cyan" | "teal" | "neutral" | "outline" | "status";
}

export function Badge({
  className,
  variant = "neutral",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono tracking-wide rounded-sm transition-colors";

  const variantStyles = {
    cyan: "bg-[rgba(6,182,212,0.1)] text-[#06b6d4] border border-[rgba(6,182,212,0.25)]",
    teal: "bg-[rgba(20,184,166,0.1)] text-[#14b8a6] border border-[rgba(20,184,166,0.25)]",
    neutral: "bg-[#131822] text-[#94a3b8] border border-[rgba(255,255,255,0.08)]",
    outline: "bg-transparent text-[#94a3b8] border border-[rgba(255,255,255,0.12)] hover:border-[rgba(6,182,212,0.4)]",
    status: "bg-[rgba(6,182,212,0.08)] text-[#00f5d4] border border-[rgba(0,245,212,0.25)]",
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </span>
  );
}
