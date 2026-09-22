import { PersonalInfo } from "@/types";

/**
 * Personal Configuration
 * 
 * IMPORTANT: In strict compliance with zero-guessing and authenticity rules:
 * - Empty string values indicate fields that await user configuration.
 * - Components will automatically detect empty values and hide or gracefully handle links.
 * - DO NOT fill these with fabricated or guessed accounts.
 */
export const personalData: PersonalInfo = {
  name: "Mücahit Başaran",
  title: "Computer Engineer & Software Developer",
  status: "AVAILABLE FOR OPPORTUNITIES",
  bio: "I am a Computer Engineering graduate interested in building practical software, AI-powered applications, and modern web experiences.",
  subBio: "Focused on clean software architecture, developer tooling, and intelligent systems.",
  location: "Türkiye",
  graduationYear: "2026",
  
  // Credentials & Socials: Use environment variables or set directly here when ready
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  githubUsername: process.env.GITHUB_USERNAME || "",
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL || (process.env.GITHUB_USERNAME ? `https://github.com/${process.env.GITHUB_USERNAME}` : ""),
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  twitterUrl: process.env.NEXT_PUBLIC_TWITTER_URL || "",

  // CV Settings: Checked automatically or configured here
  cvAvailable: true,
  cvPath: "/cv/Mucahit-Basaran-CV-TR.pdf",
  cvPathTR: "/cv/Mucahit-Basaran-CV-TR.pdf",
  cvPathEN: "/cv/Mucahit-Basaran-CV-EN.pdf",
};

/**
 * Helper to check if a social/contact link is configured and valid
 */
export function hasValue(str: string | undefined | null): boolean {
  return typeof str === "string" && str.trim().length > 0;
}
