import { Project } from "@/types";

export const featuredProjects: Project[] = [
  {
    id: "hesapkitap",
    number: "01",
    title: "HesapKitap",
    subtitle: "Modular Useful Calculation Utilities Web Platform",
    description:
      "A consolidated, modern web application gathering diverse daily and specialized calculation tools into a single cohesive interface.",
    longDescription:
      "Engineered with a clean modular structure where each calculation utility operates as an isolated, testable unit. Features lightweight state management, custom theme support, internationalization (i18n), and responsive accessibility across mobile and desktop devices.",
    category: "Web Application",
    technologies: ["React", "TypeScript", "Vite", "CSS Modules", "i18n", "Vercel"],
    githubUrl: process.env.NEXT_PUBLIC_HESAPKITAP_GITHUB || "",
    liveUrl: process.env.NEXT_PUBLIC_HESAPKITAP_DEMO || "",
    isFeatured: true,
    status: "Completed",
    highlights: [
      "Modular calculator architecture",
      "Multiple domain calculators in one app",
      "Built-in theme & dark mode support",
      "Internationalization (i18n) framework",
      "Mobile-first responsive design",
    ],
    visualType: "code",
  },
  {
    id: "agentverge",
    number: "02",
    title: "AgentVerge",
    subtitle: "AI Agent Security, Evaluation & Reliability Framework",
    description:
      "A developer-focused security and evaluation harness designed to test, benchmark, and safeguard autonomous AI agents and tool-calling pipelines.",
    longDescription:
      "Targeting safety, deterministic evaluation, and vulnerability detection in LLM-driven workflows. AgentVerge provides hooks for CI/CD pipelines to detect unintended agent behaviors, prompt leakage, and reliability failures before deployment.",
    category: "Developer Tools",
    technologies: ["Python", "AI Agents", "LLM Evaluation", "Security", "CI/CD", "Testing"],
    githubUrl: process.env.NEXT_PUBLIC_AGENTVERGE_GITHUB || "",
    liveUrl: "",
    isFeatured: true,
    status: "In Development",
    highlights: [
      "AI agent behavioral evaluation harness",
      "Automated CI/CD security validation",
      "Tool-calling reliability assessment",
      "Developer-focused integration API",
      "Active research & development stage",
    ],
    visualType: "architecture",
  },
  {
    id: "car-sound-fault-detection",
    number: "03",
    title: "Car Sound Fault Detection",
    subtitle: "Acoustic ML Analysis for Vehicle Mechanical Fault Diagnostics",
    description:
      "B.Sc. Computer Engineering graduation project focusing on diagnosing and classifying vehicle mechanical anomalies from acoustic audio recordings.",
    longDescription:
      "Combines digital signal processing (spectrogram transformation, MFCC feature extraction) with supervised machine learning algorithms to distinguish between normal engine harmonics and various mechanical failure states.",
    category: "AI & Systems",
    technologies: [
      "Python",
      "Machine Learning",
      "Audio Processing",
      "MFCC",
      "Signal Processing",
      "Engineering",
    ],
    githubUrl: process.env.NEXT_PUBLIC_CARSOUND_GITHUB || "",
    liveUrl: "",
    isFeatured: true,
    status: "Research Project",
    highlights: [
      "B.Sc. Computer Engineering Graduation Project",
      "Audio feature extraction via MFCC and spectrograms",
      "Mechanical anomaly sound classification",
      "Acoustic signal preprocessing pipeline",
      "Rigorous experimental engineering evaluation",
    ],
    visualType: "signal",
  },
];
