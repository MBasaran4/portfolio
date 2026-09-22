import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhatIBuild } from "@/components/sections/WhatIBuild";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { GitHubProjects } from "@/components/sections/GitHubProjects";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { KineticText } from "@/components/animation/KineticText";
import { getDictionary, isLocale, defaultLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = isLocale(locale) ? locale : defaultLocale;
  const dict = getDictionary(currentLocale);

  return (
    <main id="top" className="flex-1 flex flex-col">
      <Hero dict={dict.hero} />
      <About dict={dict.about} />
      <WhatIBuild dict={dict.whatIBuild} />
      <FeaturedProjects dict={dict.projects} />
      <KineticText dict={dict.kinetic} />
      <GitHubProjects dict={dict.github} />
      <Experience dict={dict.experience} />
      <Education dict={dict.education} />
      <Skills dict={dict.skills} />
      <Contact dict={dict.contact} />
    </main>
  );
}
