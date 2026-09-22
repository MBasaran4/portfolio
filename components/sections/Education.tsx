import * as React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { educationData } from "@/data/experience";
import { Badge } from "@/components/ui/Badge";
import { GraduationCap, Award, Cpu, BookOpen } from "lucide-react";
import { Dictionary } from "@/lib/i18n/types";

interface EducationProps {
  dict?: Dictionary["education"];
}

export function Education({ dict }: EducationProps) {
  const sectionNum = dict?.sectionNum || "05";
  const sectionTitle = dict?.sectionTitle || "Education & Academic Credentials";
  const sectionSubtitle =
    dict?.sectionSubtitle ||
    "Rigorous foundations in Computer Engineering and applied research.";
  const degreeLevel = dict?.degreeLevel || "Undergraduate Degree";
  const classOf = dict?.classOf || `Class of ${educationData.graduationYear}`;
  const degreeName =
    dict?.degreeName || `${educationData.degree} in ${educationData.field}`;
  const details = dict?.details || educationData.details || [];
  const erasmusNote =
    dict?.erasmusNote || "Erasmus+ Mobility Qualified Candidate";
  const capstoneTag = dict?.capstoneTag || "Graduation Capstone Project";
  const capstoneSubtitle =
    dict?.capstoneSubtitle || "Acoustic Audio AI / Machine Learning";
  const capstoneCore =
    dict?.capstoneCoreDisciplines || "Core Engineering Disciplines:";
  const capstoneShowcase =
    dict?.capstoneShowcase || "Engineering Graduation Showcase";

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <SectionHeading
        number={sectionNum}
        title={sectionTitle}
        subtitle={sectionSubtitle}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Degree Card (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-sm bg-[#131822]/90 border border-[rgba(6,182,212,0.14)] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#06b6d4] font-mono text-xs uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>{degreeLevel}</span>
              </div>
              <Badge variant="teal" className="text-[11px] font-mono">
                {classOf}
              </Badge>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#f8fafc]">{degreeName}</h3>
              <p className="text-sm font-mono text-[#00f5d4] mt-1">
                {educationData.institution}
              </p>
            </div>

            <div className="space-y-2 pt-2 text-sm text-[#94a3b8] leading-relaxed font-light">
              {details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-[#06b6d4] mt-1 text-xs">▹</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[rgba(255,255,255,0.06)] flex items-center gap-3 text-xs font-mono text-[#64748b]">
            <Award className="w-4 h-4 text-[#06b6d4]" />
            <span>{erasmusNote}</span>
          </div>
        </div>

        {/* Graduation Project Card (5 cols) */}
        {educationData.graduationProject && (
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-sm bg-[#131822]/90 border border-[rgba(0,245,212,0.2)] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#00f5d4] font-mono text-xs uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>{capstoneTag}</span>
              </div>

              <div>
                <h4 className="text-xl font-bold text-[#f8fafc]">
                  {educationData.graduationProject.title}
                </h4>
                <p className="text-xs font-mono text-[#06b6d4] mt-1">
                  {capstoneSubtitle}
                </p>
              </div>

              <p className="text-sm text-[#94a3b8] leading-relaxed font-light">
                {educationData.graduationProject.description}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono text-[#64748b] uppercase tracking-wider">
                  {capstoneCore}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {educationData.graduationProject.focus.map((f) => (
                    <Badge key={f} variant="neutral" className="text-[10px]">
                      {f}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[rgba(255,255,255,0.06)] flex items-center gap-2 text-xs font-mono text-[#00f5d4]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{capstoneShowcase}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
