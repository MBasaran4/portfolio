import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  number?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  number,
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center mx-auto",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 font-mono text-xs text-[#06b6d4] tracking-widest uppercase mb-2",
          align === "center" && "justify-center"
        )}
      >
        {number && <span className="opacity-80">[{number}]</span>}
        <span className="inline-block w-8 h-[1px] bg-[rgba(6,182,212,0.4)]" />
        <span>EXPLORE SECTION</span>
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#f8fafc]">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-[#94a3b8] max-w-2xl font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
