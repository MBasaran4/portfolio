import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090b10] disabled:pointer-events-none disabled:opacity-40 select-none cursor-pointer";

    const variantStyles = {
      primary:
        "bg-[#06b6d4] text-[#090b10] font-semibold hover:bg-[#00f5d4] shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_24px_rgba(0,245,212,0.3)] active:translate-y-[1px]",
      secondary:
        "bg-[#131822] text-[#f8fafc] border border-[rgba(6,182,212,0.2)] hover:border-[#06b6d4] hover:bg-[#1a2232] active:translate-y-[1px]",
      outline:
        "bg-transparent text-[#94a3b8] border border-[rgba(255,255,255,0.1)] hover:text-[#f8fafc] hover:border-[rgba(6,182,212,0.4)] active:translate-y-[1px]",
      ghost:
        "bg-transparent text-[#94a3b8] hover:text-[#06b6d4] hover:bg-[rgba(6,182,212,0.05)]",
    };

    const sizeStyles = {
      sm: "h-8 px-3 gap-1.5 text-[11px]",
      md: "h-10 px-4 gap-2 text-xs",
      lg: "h-12 px-6 gap-2.5 text-sm",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
