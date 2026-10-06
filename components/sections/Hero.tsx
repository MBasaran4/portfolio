"use client";

import * as React from "react";
import Link from "next/link";
import { personalData } from "@/data/personal";
import { ArrowDown, Code2, Sparkles, Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CvDropdown } from "@/components/ui/CvDropdown";
import { Dictionary } from "@/lib/i18n/types";

interface HeroProps {
  dict?: Dictionary["hero"];
}

export function Hero({ dict }: HeroProps) {
  const statusText = dict?.status || personalData.status;
  const roleText = dict?.titleRole || personalData.title;
  const descText =
    dict?.description ||
    "I build intelligent, useful and modern software experiences. Focused on combining rigorous engineering with modern AI and web technologies.";
  const viewProjectsText = dict?.viewProjects || "View Projects";
  const downloadCvText = dict?.downloadCv || "Download CV";
  const cvUponRequestText = dict?.cvUponRequest || "CV Upon Request";
  const contactText = dict?.contact || "Get in Touch";
  const scrollToExploreText = dict?.scrollToExplore || "Scroll to explore";
  const tagSoftware = dict?.tags.softwareDev || "Software Development";
  const tagWeb = dict?.tags.modernWeb || "Modern Web";
  const tagAi = dict?.tags.aiMl || "AI & Machine Learning";

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <div className="space-y-6 max-w-3xl">
        {/* Availability Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.2)] text-[11px] font-mono text-[#00f5d4] tracking-wider uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5d4] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f5d4]" />
          </span>
          <span>{statusText}</span>
        </div>

        {/* Name & Title */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f8fafc] leading-[1.08]">
            {personalData.name.split(" ")[0]}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] via-[#00f5d4] to-[#14b8a6]">
              {personalData.name.split(" ")[1]}
            </span>
          </h1>
          <p className="text-xl sm:text-2xl font-mono text-[#94a3b8] tracking-wide pt-1">
            {roleText}
          </p>
        </div>

        {/* Value Proposition Statement */}
        <p className="text-base sm:text-lg text-[#94a3b8] leading-relaxed max-w-2xl font-light">
          {descText}
        </p>

        {/* Quick Highlights / Tech Signals */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge
            variant="cyan"
            className="gap-1.5"
            data-circuit-node=""
            data-circuit-category="backend"
          >
            <Terminal className="w-3 h-3" />
            {tagSoftware}
          </Badge>
          <Badge
            variant="teal"
            className="gap-1.5"
            data-circuit-node=""
            data-circuit-category="frontend"
          >
            <Code2 className="w-3 h-3" />
            {tagWeb}
          </Badge>
          <Badge
            variant="neutral"
            className="gap-1.5"
            data-circuit-node=""
            data-circuit-category="ai"
          >
            <Sparkles className="w-3 h-3 text-[#06b6d4]" />
            {tagAi}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <Link href="#projects">
            <Button
              size="lg"
              variant="primary"
              className="group"
              data-circuit-node=""
              data-circuit-category="frontend"
            >
              <span>{viewProjectsText}</span>
              <span className="inline-block transition-transform group-hover:translate-x-1 font-mono">
                →
              </span>
            </Button>
          </Link>

          <CvDropdown
            variant="secondary"
            size="lg"
            downloadCvText={downloadCvText}
            cvUponRequestText={cvUponRequestText}
            cvTrText={dict?.cvTr || "Türkçe CV"}
            cvEnText={dict?.cvEn || "English CV"}
            align="left"
          />

          <Link href="#contact">
            <Button
              size="lg"
              variant="ghost"
              data-circuit-node=""
              data-circuit-category="default"
            >
              {contactText}
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="pt-16 sm:pt-24 flex items-center gap-3 font-mono text-xs text-[#64748b]">
        <Link
          href="#about"
          className="inline-flex items-center gap-2 hover:text-[#06b6d4] transition-colors group"
        >
          <span className="p-1 rounded border border-[rgba(255,255,255,0.08)] group-hover:border-[#06b6d4] transition-colors">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </span>
          <span className="tracking-widest uppercase text-[10px]">
            {scrollToExploreText}
          </span>
        </Link>
      </div>
    </section>
  );
}
