import * as React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experienceData } from "@/data/experience";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Calendar } from "lucide-react";
import { Dictionary } from "@/lib/i18n/types";

interface ExperienceProps {
  dict?: Dictionary["experience"];
}

export function Experience({ dict }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <SectionHeading
        number={dict?.sectionNum || "04"}
        title={dict?.sectionTitle || "Experience & Practical Training"}
        subtitle={
          dict?.sectionSubtitle ||
          "Hands-on software development and systems engineering internships."
        }
      />

      <div className="relative border-l border-[rgba(6,182,212,0.2)] ml-4 sm:ml-6 pl-6 sm:pl-10 space-y-12">
        {experienceData.map((item) => {
          // Localized overrides if present in dict
          const isDijital = item.id === "dijital-adam";
          const localizedExp = isDijital ? dict?.dijitalAdam : dict?.cakuIt;

          const role = localizedExp?.role || item.role;
          const location = localizedExp?.location || item.location;
          const period = localizedExp?.period || item.period;
          const bullets = localizedExp?.bullets || item.description;

          return (
            <div key={item.id} className="relative group">
              {/* Timeline node dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1 w-3.5 h-3.5 rounded-full bg-[#090b10] border-2 border-[#06b6d4] group-hover:border-[#00f5d4] group-hover:scale-125 transition-all duration-200 shadow-[0_0_10px_rgba(6,182,212,0.4)]" />

              {/* Experience Card */}
              <div className="p-6 sm:p-7 rounded-sm bg-[#131822]/90 border border-[rgba(6,182,212,0.12)] group-hover:border-[rgba(6,182,212,0.3)] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#f8fafc]">{role}</h3>
                    <p className="text-sm font-mono text-[#06b6d4] mt-0.5">
                      {item.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#64748b]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#06b6d4]" />
                      {location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#06b6d4]" />
                      {period}
                    </span>
                  </div>
                </div>

                {/* Description bullets */}
                <ul className="space-y-2 text-sm text-[#94a3b8] leading-relaxed font-light mb-5">
                  {bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#06b6d4] mt-1 font-mono text-xs">▹</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[rgba(255,255,255,0.05)]">
                  {item.technologies.map((tech) => (
                    <Badge key={tech} variant="neutral" className="text-[10px]">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
