import * as React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { featuredProjects } from "@/data/projects";
import { Dictionary } from "@/lib/i18n/types";

interface FeaturedProjectsProps {
  dict?: Dictionary["projects"];
}

export function FeaturedProjects({ dict }: FeaturedProjectsProps) {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <SectionHeading
        number={dict?.sectionNum || "02"}
        title={dict?.sectionTitle || "Featured Projects"}
        subtitle={
          dict?.sectionSubtitle ||
          "A curated selection of engineering endeavors spanning web architectures, AI evaluation harnesses, and acoustic signal processing."
        }
      />

      <div className="space-y-12">
        {featuredProjects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            reverse={idx % 2 === 1}
            dict={dict}
          />
        ))}
      </div>
    </section>
  );
}
