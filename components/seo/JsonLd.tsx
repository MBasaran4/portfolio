import * as React from "react";
import { personalData, hasValue } from "@/data/personal";

interface JsonLdProps {
  jobTitle?: string;
  description?: string;
}

export function JsonLd({ jobTitle, description }: JsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mbasaran.dev";

  const sameAsLinks = [
    personalData.githubUrl,
    personalData.linkedinUrl,
    personalData.twitterUrl,
  ].filter(hasValue);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalData.name,
    jobTitle: jobTitle || personalData.title,
    url: siteUrl,
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Çankırı Karatekin University",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: personalData.location,
    },
    description: description || personalData.bio,
    knowsAbout: [
      "Computer Engineering",
      "Software Engineering",
      "Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "Artificial Intelligence",
      "Machine Learning",
      "AI Agents",
      "Audio Classification",
    ],
    ...(sameAsLinks.length > 0 ? { sameAs: sameAsLinks } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
