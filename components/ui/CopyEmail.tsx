"use client";

import * as React from "react";
import { useState } from "react";
import { Copy, Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { hasValue } from "@/data/personal";

interface CopyEmailProps {
  email: string;
  copyText?: string;
  copiedText?: string;
  uponRequestText?: string;
  setupInfoText?: string;
  clipboardErrorText?: string;
}

export function CopyEmail({
  email,
  copyText = "Copy Email",
  copiedText = "Copied to Clipboard!",
  uponRequestText = "Email Upon Request",
  setupInfoText = "Email is ready to be configured in .env.local (NEXT_PUBLIC_CONTACT_EMAIL)",
  clipboardErrorText = "Could not access clipboard. Please copy manually.",
}: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const isConfigured = hasValue(email);

  async function handleCopy() {
    if (!isConfigured) {
      setInfoMessage(setupInfoText);
      setTimeout(() => setInfoMessage(null), 4000);
      return;
    }

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers / non-secure contexts
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setInfoMessage(clipboardErrorText);
      setTimeout(() => setInfoMessage(null), 3000);
    }
  }

  return (
    <div className="relative inline-flex flex-col items-center">
      <Button
        size="lg"
        variant={isConfigured ? "primary" : "secondary"}
        onClick={handleCopy}
        className="gap-2 font-mono"
        data-circuit-node=""
        data-circuit-category="default"
        aria-label={isConfigured ? `${copyText}: ${email}` : uponRequestText}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-[#090b10]" />
            <span>{copiedText}</span>
          </>
        ) : isConfigured ? (
          <>
            <Copy className="w-4 h-4" />
            <span>{copyText}</span>
          </>
        ) : (
          <>
            <Mail className="w-4 h-4 text-[#06b6d4]" />
            <span>{uponRequestText}</span>
          </>
        )}
      </Button>

      {/* Info / Feedback Message */}
      {infoMessage && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#131822] border border-[rgba(6,182,212,0.3)] text-[#00f5d4] px-3 py-1 rounded text-xs font-mono shadow-lg animate-in fade-in slide-in-from-top-1 z-20">
          {infoMessage}
        </div>
      )}
    </div>
  );
}
