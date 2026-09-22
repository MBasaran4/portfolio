"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { personalData } from "@/data/personal";
import { FileText, ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CvDropdownProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  downloadCvText?: string;
  cvUponRequestText?: string;
  cvTrText?: string;
  cvEnText?: string;
  cvTooltipText?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function CvDropdown({
  variant = "secondary",
  size = "lg",
  downloadCvText = "Download CV",
  cvUponRequestText = "CV Upon Request",
  cvTrText = "Türkçe CV",
  cvEnText = "English CV",
  cvTooltipText = "CV will be available upon upload",
  align = "left",
  className,
}: CvDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const itemRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);

  // Close dropdown on click outside or touch outside
  React.useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key on container
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      buttonRef.current?.focus();
    } else if (e.key === "ArrowDown" && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
      setTimeout(() => itemRefs.current[0]?.focus(), 10);
    }
  };

  const handleItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      buttonRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % 2;
      itemRefs.current[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + 2) % 2;
      itemRefs.current[prevIndex]?.focus();
    } else if (e.key === "Tab") {
      setIsOpen(false);
    }
  };

  if (!personalData.cvAvailable) {
    return (
      <div className={cn("relative group inline-block", className)}>
        <Button
          size={size}
          variant="outline"
          disabled
          className="opacity-50 cursor-not-allowed gap-2"
          title={cvTooltipText}
        >
          <FileText className="w-4 h-4 text-[#94a3b8]" />
          <span>{cvUponRequestText}</span>
        </Button>
      </div>
    );
  }

  const trHref = personalData.cvPathTR || "/cv/Mucahit-Basaran-CV-TR.pdf";
  const enHref = personalData.cvPathEN || "/cv/Mucahit-Basaran-CV-EN.pdf";

  const alignmentClasses = {
    left: "left-0",
    center: "left-1/2 -translate-x-1/2",
    right: "right-0",
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block text-left", className)}
      onKeyDown={handleKeyDown}
    >
      <Button
        ref={buttonRef}
        type="button"
        size={size}
        variant={variant}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`${downloadCvText} - ${cvTrText} / ${cvEnText}`}
        className="gap-2"
      >
        <FileText className="w-4 h-4 text-[#06b6d4]" />
        <span>{downloadCvText}</span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-[#94a3b8] transition-transform duration-200",
            isOpen && "rotate-180 text-[#00f5d4]"
          )}
          aria-hidden="true"
        />
      </Button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-label="CV Language Options"
          className={cn(
            "absolute z-50 mt-2 w-48 sm:w-52 p-1.5 rounded-sm bg-[#0e131d]/95 border border-[rgba(6,182,212,0.25)] shadow-[0_12px_32px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all motion-reduce:transition-none",
            alignmentClasses[align]
          )}
        >
          <div className="px-2.5 py-1 mb-1 border-b border-[rgba(255,255,255,0.06)]">
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#64748b]">
              PDF Format
            </span>
          </div>

          <a
            ref={(el) => {
              itemRefs.current[0] = el;
            }}
            href={trHref}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            tabIndex={isOpen ? 0 : -1}
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => handleItemKeyDown(e, 0)}
            className="flex items-center justify-between px-2.5 py-2 rounded-sm text-xs font-mono text-[#f8fafc] hover:text-[#00f5d4] hover:bg-[rgba(6,182,212,0.12)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#06b6d4] focus-visible:bg-[rgba(6,182,212,0.12)] group cursor-pointer select-none"
          >
            <div className="flex items-center gap-2">
              <span className="text-[#06b6d4] text-[10px] font-bold px-1.5 py-0.5 rounded bg-[rgba(6,182,212,0.15)]">
                TR
              </span>
              <span>{cvTrText}</span>
            </div>
            <ExternalLink className="w-3 h-3 text-[#64748b] group-hover:text-[#00f5d4] transition-colors" />
          </a>

          <a
            ref={(el) => {
              itemRefs.current[1] = el;
            }}
            href={enHref}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            tabIndex={isOpen ? 0 : -1}
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => handleItemKeyDown(e, 1)}
            className="flex items-center justify-between px-2.5 py-2 rounded-sm text-xs font-mono text-[#f8fafc] hover:text-[#00f5d4] hover:bg-[rgba(6,182,212,0.12)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#06b6d4] focus-visible:bg-[rgba(6,182,212,0.12)] group cursor-pointer select-none"
          >
            <div className="flex items-center gap-2">
              <span className="text-[#00f5d4] text-[10px] font-bold px-1.5 py-0.5 rounded bg-[rgba(0,245,212,0.15)]">
                EN
              </span>
              <span>{cvEnText}</span>
            </div>
            <ExternalLink className="w-3 h-3 text-[#64748b] group-hover:text-[#00f5d4] transition-colors" />
          </a>
        </div>
      )}
    </div>
  );
}
