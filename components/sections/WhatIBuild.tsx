import * as React from "react";
import { Layout, BrainCircuit, Wrench } from "lucide-react";
import { Dictionary } from "@/lib/i18n/types";

interface WhatIBuildProps {
  dict?: Dictionary["whatIBuild"];
}

export function WhatIBuild({ dict }: WhatIBuildProps) {
  const categories = [
    {
      number: "01",
      title: dict?.webTitle || "Web Applications",
      tagline:
        dict?.webTagline || "Modern, responsive and scalable web experiences",
      description:
        dict?.webDesc ||
        "Architecting accessible client interfaces and performant full-stack web applications with React, Next.js, and TypeScript. Emphasizing clean state management, modular components, and fluid responsiveness.",
      icon: Layout,
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST / APIs"],
    },
    {
      number: "02",
      title: dict?.aiTitle || "AI & Intelligent Systems",
      tagline:
        dict?.aiTagline || "Machine learning, audio analysis and LLM workflows",
      description:
        dict?.aiDesc ||
        "Applying machine learning algorithms to practical challenges, including audio fault classification, prompt engineering, RAG pipelines, and agentic workflows designed to augment human capability.",
      icon: BrainCircuit,
      tech: ["Python", "Machine Learning", "LLMs", "Audio Classification", "RAG"],
    },
    {
      number: "03",
      title: dict?.toolsTitle || "Developer Tools",
      tagline:
        dict?.toolsTagline ||
        "Automation, security checks and evaluation systems",
      description:
        dict?.toolsDesc ||
        "Crafting internal developer utilities, CI/CD safety checks, agent reliability harnesses, and productivity tools that streamline development cycles and enforce code correctness.",
      icon: Wrench,
      tech: ["Docker", "CI/CD", "Testing", "Security Evaluation", "Git"],
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-3 font-mono text-xs text-[#06b6d4] tracking-widest uppercase mb-2">
          <span>[DOMAINS]</span>
          <span className="inline-block w-8 h-[1px] bg-[rgba(6,182,212,0.4)]" />
          <span>{dict?.badge || "CORE EXPERTISE"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f8fafc]">
          {dict?.title || "What I Build"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.number}
              className="p-6 rounded-sm bg-[#131822]/80 border border-[rgba(6,182,212,0.12)] hover:border-[rgba(6,182,212,0.35)] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#06b6d4] font-semibold">
                    {item.number}
                  </span>
                  <div className="p-2 rounded bg-[rgba(6,182,212,0.06)] text-[#06b6d4] group-hover:text-[#00f5d4] group-hover:bg-[rgba(0,245,212,0.1)] transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#f8fafc] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-[#00f5d4] mb-3">
                  {item.tagline}
                </p>
                <p className="text-sm text-[#94a3b8] leading-relaxed mb-6 font-light">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap gap-1.5">
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono text-[#64748b] bg-[#090b10] px-2 py-0.5 rounded border border-[rgba(255,255,255,0.04)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
