import * as React from "react";
import { personalData, hasValue } from "@/data/personal";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Button } from "@/components/ui/Button";
import { CvDropdown } from "@/components/ui/CvDropdown";
import { Send, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Dictionary } from "@/lib/i18n/types";

interface ContactProps {
  dict?: Dictionary["contact"];
}

export function Contact({ dict }: ContactProps) {
  const pillText = dict?.pill || "GET IN TOUCH";
  const heading1 = dict?.headingLine1 || "Let's Build";
  const heading2 = dict?.headingLine2 || "Something.";
  const descriptionText =
    dict?.description ||
    "Have a project, opportunity, or interested in collaborating on AI agents, machine learning, or modern web systems?";
  const downloadCvText = dict?.downloadCv || "Download CV";
  const cvUponRequestText = dict?.cvUponRequest || "CV Upon Request";
  const cvTooltipText =
    dict?.cvPendingTooltip ||
    "CV will be downloadable when added to /public/cv/";
  const locationText = dict?.locationNote || personalData.location;
  const classNoteText =
    dict?.classNote || "B.Sc. Computer Engineering (2026)";

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <div className="p-8 sm:p-12 md:p-16 rounded-sm bg-gradient-to-b from-[#131822] to-[#0d121c] border border-[rgba(6,182,212,0.2)] relative overflow-hidden text-center">
        {/* Decorative subtle ambient lights */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[rgba(6,182,212,0.08)] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          {/* Section pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.2)] text-[11px] font-mono text-[#00f5d4] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{pillText}</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f8fafc] uppercase leading-tight">
            {heading1} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] via-[#00f5d4] to-[#14b8a6]">
              {heading2}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#94a3b8] font-light leading-relaxed">
            {descriptionText}
          </p>

          {/* Actions Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            {/* Copy Email CTA */}
            <CopyEmail
              email={personalData.email}
              copyText={dict?.copyEmail}
              copiedText={dict?.copied}
              uponRequestText={dict?.emailUponRequest}
              setupInfoText={dict?.emailSetupInfo}
              clipboardErrorText={dict?.emailClipboardError}
            />

            {/* LinkedIn CTA (Rendered only if configured) */}
            {hasValue(personalData.linkedinUrl) && (
              <a
                href={personalData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile (opens in a new tab)"
              >
                <Button size="lg" variant="secondary" className="gap-2">
                  <LinkedinIcon className="w-4 h-4 text-[#06b6d4]" />
                  <span>LinkedIn ↗</span>
                </Button>
              </a>
            )}

            {/* GitHub CTA (Rendered only if configured) */}
            {hasValue(personalData.githubUrl) && (
              <a
                href={personalData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile (opens in a new tab)"
              >
                <Button size="lg" variant="secondary" className="gap-2">
                  <GithubIcon className="w-4 h-4 text-[#06b6d4]" />
                  <span>GitHub ↗</span>
                </Button>
              </a>
            )}

            {/* CV Download CTA */}
            <CvDropdown
              variant="outline"
              size="lg"
              downloadCvText={downloadCvText}
              cvUponRequestText={cvUponRequestText}
              cvTrText={dict?.cvTr || "Türkçe CV"}
              cvEnText={dict?.cvEn || "English CV"}
              cvTooltipText={cvTooltipText}
              align="center"
            />
          </div>

          {/* Location & Status footer note */}
          <div className="pt-8 text-xs font-mono text-[#64748b] flex items-center justify-center gap-4">
            <span className="flex items-center gap-1.5">
              <Send className="w-3 h-3 text-[#06b6d4]" />
              {locationText}
            </span>
            <span>·</span>
            <span>{classNoteText}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
