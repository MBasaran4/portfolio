import * as React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { personalData } from "@/data/personal";
import { Cpu, Compass, Briefcase, GraduationCap } from "lucide-react";
import { Dictionary } from "@/lib/i18n/types";

interface AboutProps {
  dict?: Dictionary["about"];
}

export function About({ dict }: AboutProps) {
  const leadBio = dict?.leadBio || personalData.bio;
  const degreeDesc =
    dict?.degreeDesc ||
    "Completing my B.Sc. in Computer Engineering at Çankırı Karatekin University (Class of 2026), my primary focus is developing responsive, reliable web platforms, specialized developer tooling, and intelligent systems powered by machine learning and modern language models.";
  const philosophyDesc =
    dict?.philosophyDesc ||
    "I prioritize maintainable architecture, typed systems, and purposeful user experiences over superficial complexity. Every project is approached from an engineering perspective: solving authentic problems with clean, scalable code.";
  const degreeBadge =
    dict?.degreeBadge || "B.Sc. Computer Engineering · 2026";

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <SectionHeading
        number={dict?.sectionNum || "01"}
        title={dict?.sectionTitle || "About & Engineering Philosophy"}
        subtitle={
          dict?.sectionSubtitle ||
          "Bridging core computer science principles with modern product engineering and applied machine learning."
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Main Narrative */}
        <div className="lg:col-span-7 space-y-6 text-[#94a3b8] leading-relaxed">
          <p className="text-base sm:text-lg text-[#f8fafc] font-normal leading-relaxed">
            {leadBio}
          </p>

          <p className="text-sm sm:text-base leading-relaxed">{degreeDesc}</p>

          <p className="text-sm sm:text-base leading-relaxed">{philosophyDesc}</p>

          <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#06b6d4]">
            <div className="flex items-center gap-2 p-2.5 rounded bg-[rgba(6,182,212,0.05)] border border-[rgba(6,182,212,0.15)]">
              <GraduationCap className="w-4 h-4" />
              <span>{degreeBadge}</span>
            </div>
          </div>
        </div>

        {/* Quick Status Cards */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-4">
          {/* Card 1: Currently Building */}
          <div className="p-5 rounded-sm bg-[#131822] border border-[rgba(6,182,212,0.12)] hover:border-[rgba(6,182,212,0.3)] transition-all">
            <div className="flex items-center gap-2.5 text-[#06b6d4] font-mono text-xs uppercase tracking-wider mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>{dict?.currentlyBuildingTitle || "Currently Building"}</span>
            </div>
            <p className="text-sm text-[#f8fafc] font-medium">
              {dict?.currentlyBuildingDesc ||
                "Practical web utilities & AI-augmented software"}
            </p>
            <p className="text-xs text-[#94a3b8] mt-1 font-mono">
              {dict?.currentlyBuildingSub ||
                "HesapKitap suite & AgentVerge evaluations"}
            </p>
          </div>

          {/* Card 2: Exploring */}
          <div className="p-5 rounded-sm bg-[#131822] border border-[rgba(6,182,212,0.12)] hover:border-[rgba(6,182,212,0.3)] transition-all">
            <div className="flex items-center gap-2.5 text-[#00f5d4] font-mono text-xs uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>{dict?.exploringTitle || "Exploring"}</span>
            </div>
            <p className="text-sm text-[#f8fafc] font-medium">
              {dict?.exploringDesc ||
                "Autonomous agents, RAG & Audio Classification"}
            </p>
            <p className="text-xs text-[#94a3b8] mt-1 font-mono">
              {dict?.exploringSub ||
                "LLMs · Agentic workflows · Audio ML models"}
            </p>
          </div>

          {/* Card 3: Interested In */}
          <div className="p-5 rounded-sm bg-[#131822] border border-[rgba(6,182,212,0.12)] hover:border-[rgba(6,182,212,0.3)] transition-all">
            <div className="flex items-center gap-2.5 text-[#14b8a6] font-mono text-xs uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{dict?.interestedInTitle || "Interested In"}</span>
            </div>
            <p className="text-sm text-[#f8fafc] font-medium">
              {dict?.interestedInDesc ||
                "Software Engineering & AI Developer Roles"}
            </p>
            <p className="text-xs text-[#94a3b8] mt-1 font-mono">
              {dict?.interestedInSub ||
                "Open to collaborative engineering & innovative teams"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
