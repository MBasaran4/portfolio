import * as React from "react";
import Link from "next/link";
import { personalData, hasValue } from "@/data/personal";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Dictionary } from "@/lib/i18n/types";

interface FooterProps {
  dict?: Dictionary["footer"];
}

export function Footer({ dict }: FooterProps) {
  const roleInfo =
    dict?.roleInfo || `${personalData.title} · ${personalData.location}`;
  const builtWith =
    dict?.builtWith || "Engineered with Next.js, TypeScript & Tailwind CSS";
  const backToTop = dict?.backToTop || "Back to top";

  return (
    <footer className="border-t border-[rgba(6,182,212,0.12)] bg-[#090b10] py-12 text-[#94a3b8] font-mono text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright & Info */}
          <div className="text-center md:text-left space-y-1">
            <p className="text-[#f8fafc] font-medium tracking-wide">
              © 2026 {personalData.name}
            </p>
            <p className="text-[#64748b]">{roleInfo}</p>
          </div>

          {/* Technology Note */}
          <div className="text-center text-[#64748b] text-[11px]">
            <span>{builtWith}</span>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-6">
            {hasValue(personalData.githubUrl) && (
              <a
                href={personalData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94a3b8] hover:text-[#06b6d4] transition-colors flex items-center gap-1.5"
                aria-label="GitHub Profile (opens in a new tab)"
              >
                <GithubIcon className="w-3.5 h-3.5 text-[#06b6d4]" />
                <span>GitHub</span>
              </a>
            )}

            {hasValue(personalData.linkedinUrl) && (
              <a
                href={personalData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94a3b8] hover:text-[#06b6d4] transition-colors flex items-center gap-1.5"
                aria-label="LinkedIn Profile (opens in a new tab)"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#06b6d4]" />
                <span>LinkedIn</span>
              </a>
            )}

            <Link
              href="#top"
              className="p-2 border border-[rgba(255,255,255,0.08)] hover:border-[#06b6d4] hover:text-[#06b6d4] rounded-sm transition-colors"
              aria-label={backToTop}
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
