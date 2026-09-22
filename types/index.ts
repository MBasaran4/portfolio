export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  category: "Web Application" | "AI & Systems" | "Developer Tools" | "Engineering";
  technologies: string[];
  githubUrl?: string; // Optional, only shown if valid URL
  liveUrl?: string;   // Optional, only shown if valid URL
  isFeatured: boolean;
  status: "Completed" | "In Development" | "Research Project";
  highlights: string[];
  visualType: "code" | "architecture" | "signal";
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: "Internship" | "Full-time" | "Part-time" | "Contract";
  description: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  graduationYear: string;
  details?: string[];
  graduationProject?: {
    title: string;
    description: string;
    focus: string[];
  };
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  status: string;
  bio: string;
  subBio: string;
  location: string;
  graduationYear: string;
  email: string; // empty string placeholder if unset
  githubUsername: string; // empty string placeholder if unset
  githubUrl: string; // empty string placeholder if unset
  linkedinUrl: string; // empty string placeholder if unset
  twitterUrl: string; // empty string placeholder if unset
  cvAvailable: boolean;
  cvPath: string;
  cvPathTR?: string;
  cvPathEN?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
}
