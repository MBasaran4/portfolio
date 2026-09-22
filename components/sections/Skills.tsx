import * as React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills";
import { Badge } from "@/components/ui/Badge";
import { Code, Layout, Server, Sparkles, Terminal } from "lucide-react";
import { Dictionary } from "@/lib/i18n/types";

interface SkillsProps {
  dict?: Dictionary["skills"];
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Languages: Code,
  Frontend: Layout,
  Backend: Server,
  "AI & Machine Learning": Sparkles,
  "Tools & Infrastructure": Terminal,
};

export function Skills({ dict }: SkillsProps) {
  const categoryNames: Record<string, string> = {
    Languages: dict?.categories.languages || "Languages",
    Frontend: dict?.categories.frontend || "Frontend",
    Backend: dict?.categories.backend || "Backend",
    "AI & Machine Learning":
      dict?.categories.aiMl || "AI & Machine Learning",
    "Tools & Infrastructure":
      dict?.categories.tools || "Tools & Infrastructure",
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <SectionHeading
        number={dict?.sectionNum || "06"}
        title={dict?.sectionTitle || "Technical Competencies"}
        subtitle={
          dict?.sectionSubtitle ||
          "Languages, frameworks, systems, and tools applied across academic and practical projects."
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.category] || Code;
          const displayCategory = categoryNames[cat.category] || cat.category;

          return (
            <div
              key={cat.category}
              className="p-6 rounded-sm bg-[#131822]/80 border border-[rgba(6,182,212,0.12)] hover:border-[rgba(6,182,212,0.3)] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-2.5 text-[#06b6d4] font-mono text-xs uppercase tracking-wider mb-4 pb-3 border-b border-[rgba(255,255,255,0.05)]">
                  <Icon className="w-4 h-4 text-[#06b6d4] group-hover:text-[#00f5d4] transition-colors" />
                  <span>{displayCategory}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="neutral"
                      className="text-xs font-mono py-1 px-3 hover:border-[rgba(6,182,212,0.4)] hover:text-[#f8fafc] transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-between text-[10px] font-mono text-[#64748b]">
                <span>{dict?.verifiedCompetency || "Verified Competency"}</span>
                <span className="text-[#06b6d4] font-bold">
                  {dict?.activeStatus || "● Active"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
