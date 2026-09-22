import * as React from "react";
import { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ProjectVisualPreview } from "@/components/ui/ProjectVisualPreview";
import { ExternalLink, CheckCircle2, Clock } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { hasValue } from "@/data/personal";
import { Dictionary } from "@/lib/i18n/types";

interface ProjectCardProps {
  project: Project;
  reverse?: boolean;
  dict?: Dictionary["projects"];
}

export function ProjectCard({
  project,
  reverse = false,
  dict,
}: ProjectCardProps) {
  // Localized project details fallback to default project fields
  const localizedItem = dict?.items?.[project.id as keyof typeof dict.items];
  const subtitle = localizedItem?.subtitle || project.subtitle;
  const description =
    localizedItem?.longDescription ||
    localizedItem?.description ||
    project.longDescription ||
    project.description;
  const highlights = localizedItem?.highlights || project.highlights;

  const statusCompletedText = dict?.statusCompleted || "Completed";
  const statusInDevText = dict?.statusInDev || "In Development";
  const statusResearchText = dict?.statusResearch || "Research Project";
  const githubButtonText = dict?.githubButton || "GitHub ↗";
  const liveDemoButtonText = dict?.liveDemoButton || "Live Demo ↗";

  const hasGithub = hasValue(project.githubUrl);
  const hasLive = hasValue(project.liveUrl);

  return (
    <article className="p-6 sm:p-8 rounded-sm bg-[#131822]/90 border border-[rgba(6,182,212,0.14)] hover:border-[rgba(6,182,212,0.35)] transition-all duration-300">
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
          reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Visual Preview Side (6 cols) */}
        <div className={`lg:col-span-6 ${reverse ? "lg:order-2" : "lg:order-1"}`}>
          <ProjectVisualPreview
            type={project.visualType}
            title={project.title}
            badgeText={dict?.previewBadge}
            schematicText={dict?.previewSchematic}
            illustrativeText={dict?.illustrativePreview}
          />
        </div>

        {/* Content Side (6 cols) */}
        <div
          className={`lg:col-span-6 flex flex-col justify-between space-y-5 ${
            reverse ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <div className="space-y-3">
            {/* Header: Number, Category & Status */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#06b6d4]">
                <span className="font-bold text-sm tracking-wider">
                  [{project.number}]
                </span>
                <span className="text-[#64748b]">/</span>
                <span className="uppercase tracking-widest text-[11px] text-[#94a3b8]">
                  {project.category}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {project.status === "Completed" && (
                  <Badge variant="teal" className="gap-1 text-[10px]">
                    <CheckCircle2 className="w-3 h-3" />
                    {statusCompletedText}
                  </Badge>
                )}
                {project.status === "In Development" && (
                  <Badge variant="status" className="gap-1 text-[10px]">
                    <Clock className="w-3 h-3" />
                    {statusInDevText}
                  </Badge>
                )}
                {project.status === "Research Project" && (
                  <Badge variant="cyan" className="gap-1 text-[10px]">
                    {statusResearchText}
                  </Badge>
                )}
              </div>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#f8fafc] tracking-tight">
                {project.title}
              </h3>
              {subtitle && (
                <p className="text-xs sm:text-sm font-mono text-[#00f5d4] mt-1">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-[#94a3b8] leading-relaxed font-light">
              {description}
            </p>

            {/* Highlights List */}
            <ul className="space-y-1.5 pt-1 text-xs text-[#94a3b8] font-mono">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#06b6d4] mt-0.5">▹</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Pills & Action CTAs */}
          <div className="space-y-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="neutral" className="text-[10px]">
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Distinct GitHub & Live Demo Action Buttons */}
            {(hasGithub || hasLive) && (
              <div className="flex flex-wrap items-center gap-3 pt-1 font-mono text-xs">
                {hasGithub && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} GitHub repository (opens in a new tab)`}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#090b10] border border-[rgba(6,182,212,0.25)] text-[#06b6d4] hover:text-[#00f5d4] hover:border-[rgba(0,245,212,0.4)] transition-all active:translate-y-[1px]"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>{githubButtonText}</span>
                  </a>
                )}

                {hasLive && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live demo website (opens in a new tab)`}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[rgba(6,182,212,0.12)] border border-[rgba(6,182,212,0.35)] text-[#00f5d4] hover:bg-[rgba(6,182,212,0.22)] hover:text-[#f8fafc] hover:border-[#00f5d4] transition-all active:translate-y-[1px]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{liveDemoButtonText}</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
