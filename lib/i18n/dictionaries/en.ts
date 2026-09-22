import { Dictionary } from "../types";

export const enDictionary: Dictionary = {
  locale: "en",
  nav: {
    about: "About",
    projects: "Projects",
    experience: "Experience",
    skills: "Skills",
    contact: "Contact",
  },
  hero: {
    status: "AVAILABLE FOR OPPORTUNITIES",
    titleFirst: "MÜCAHİT",
    titleLast: "BAŞARAN",
    titleRole: "Computer Engineer & Software Developer",
    description:
      "I build intelligent, useful and modern software experiences. Focused on combining rigorous engineering with modern AI and web technologies.",
    viewProjects: "View Projects",
    downloadCv: "Download CV",
    cvTr: "Türkçe CV",
    cvEn: "English CV",
    cvUponRequest: "CV Upon Request",
    contact: "Get in Touch",
    scrollToExplore: "Scroll to explore",
    tags: {
      softwareDev: "Software Development",
      modernWeb: "Modern Web",
      aiMl: "AI & Machine Learning",
    },
  },
  about: {
    sectionNum: "01",
    sectionTitle: "About & Engineering Philosophy",
    sectionSubtitle:
      "Bridging core computer science principles with modern product engineering and applied machine learning.",
    leadBio:
      "I am a Computer Engineering graduate interested in building practical software, AI-powered applications, and modern web experiences.",
    degreeDesc:
      "Completing my B.Sc. in Computer Engineering at Çankırı Karatekin University (Class of 2026), my primary focus is developing responsive, reliable web platforms, specialized developer tooling, and intelligent systems powered by machine learning and modern language models.",
    philosophyDesc:
      "I prioritize maintainable architecture, typed systems, and purposeful user experiences over superficial complexity. Every project is approached from an engineering perspective: solving authentic problems with clean, scalable code.",
    degreeBadge: "B.Sc. · Computer Engineering · 2026",
    currentlyBuildingTitle: "Currently Building",
    currentlyBuildingDesc: "Practical web utilities & AI-augmented software",
    currentlyBuildingSub: "HesapKitap suite & AgentVerge evaluations",
    exploringTitle: "Exploring",
    exploringDesc: "Autonomous agents, RAG & Audio Classification",
    exploringSub: "LLMs · Agentic workflows · Audio ML models",
    interestedInTitle: "Interested In",
    interestedInDesc: "Software Engineering & AI Developer Roles",
    interestedInSub: "Open to collaborative engineering & innovative teams",
  },
  whatIBuild: {
    badge: "CORE EXPERTISE",
    title: "What I Build",
    webTitle: "Web Applications",
    webTagline: "Modern, responsive and scalable web experiences",
    webDesc:
      "Architecting accessible client interfaces and performant full-stack web applications with React, Next.js, and TypeScript. Emphasizing clean state management, modular components, and fluid responsiveness.",
    aiTitle: "AI & Intelligent Systems",
    aiTagline: "Machine learning, audio analysis and LLM workflows",
    aiDesc:
      "Applying machine learning algorithms to practical challenges, including vehicle acoustic fault classification, prompt engineering, RAG pipelines, and agentic workflows designed to augment human capability.",
    toolsTitle: "Developer Tools",
    toolsTagline: "Automation, security checks and evaluation systems",
    toolsDesc:
      "Crafting internal developer utilities, CI/CD safety checks, agent reliability harnesses, and productivity tools that streamline development cycles and enforce code correctness.",
  },
  projects: {
    sectionNum: "02",
    sectionTitle: "Featured Projects",
    sectionSubtitle:
      "A curated selection of engineering endeavors spanning web architectures, AI evaluation harnesses, and acoustic signal processing.",
    statusCompleted: "Completed",
    statusInDev: "In Development",
    statusResearch: "Research Project",
    githubButton: "GitHub ↗",
    liveDemoButton: "Live Demo ↗",
    previewBadge: "Technical Preview",
    previewSchematic: "Architectural Schematic",
    illustrativePreview: "Illustrative Preview",
    items: {
      hesapkitap: {
        subtitle: "Modular Useful Calculation Utilities Web Platform",
        description:
          "A consolidated, modern web application gathering diverse daily and specialized calculation tools into a single cohesive interface.",
        longDescription:
          "Engineered with a clean modular structure where each calculation utility operates as an isolated, testable unit. Features lightweight state management, custom theme support, internationalization (i18n), and responsive accessibility across mobile and desktop devices.",
        highlights: [
          "Modular calculator architecture",
          "Multiple domain calculators in one app",
          "Built-in theme & dark mode support",
          "Internationalization (i18n) framework",
          "Mobile-first responsive design",
        ],
      },
      agentverge: {
        subtitle: "AI Agent Security, Evaluation & Reliability Framework",
        description:
          "A developer-focused security and evaluation harness designed to test, benchmark, and safeguard autonomous AI agents and tool-calling pipelines.",
        longDescription:
          "Targeting safety, deterministic evaluation, and vulnerability detection in LLM-driven workflows. AgentVerge provides hooks for CI/CD pipelines to detect unintended agent behaviors, prompt leakage, and reliability failures before deployment.",
        highlights: [
          "AI agent behavioral evaluation harness",
          "Automated CI/CD security validation",
          "Tool-calling reliability assessment",
          "Developer-focused integration API",
          "Active research & development stage",
        ],
      },
      carsound: {
        subtitle: "Acoustic ML Analysis for Vehicle Mechanical Fault Diagnostics",
        description:
          "B.Sc. Computer Engineering graduation project focusing on diagnosing and classifying vehicle mechanical anomalies from acoustic audio recordings.",
        longDescription:
          "Combines digital signal processing (spectrogram transformation, MFCC feature extraction) with supervised machine learning algorithms to distinguish between normal engine harmonics and various mechanical failure states.",
        highlights: [
          "B.Sc. Computer Engineering Graduation Project",
          "Audio feature extraction via MFCC and spectrograms",
          "Mechanical anomaly sound classification",
          "Acoustic signal preprocessing pipeline",
          "Rigorous experimental engineering evaluation",
        ],
      },
    },
  },
  github: {
    sectionNum: "03",
    sectionTitle: "From GitHub",
    sectionSubtitle:
      "Recent repositories and open source explorations directly from GitHub.",
    viewProfile: "View GitHub Profile ↗",
    setupTitle: "GitHub Stream Ready",
    setupMessage:
      "Configure GITHUB_USERNAME in .env.local to stream public repositories automatically with cached revalidation.",
    setupEnvHint: "// In .env.local",
    unavailable: "GitHub projects are temporarily unavailable.",
    exploreDirectly: "Explore directly on GitHub",
    noRepos: "No public repositories found for this account.",
    noDescription: "No public description provided.",
  },
  experience: {
    sectionNum: "04",
    sectionTitle: "Experience & Practical Training",
    sectionSubtitle:
      "Hands-on software development and systems engineering internships.",
    dijitalAdam: {
      role: "Software Engineering Intern",
      location: "Balıkesir, Türkiye",
      period: "Internship Period",
      bullets: [
        "Engaged in full-stack web application development workflows using modern JavaScript/TypeScript ecosystems.",
        "Collaborated on front-end user interfaces, component modularity, and responsive layout implementations.",
        "Participated in agile code reviews, version control discipline, and bug resolution cycles.",
      ],
    },
    cakuIt: {
      role: "Hardware & IT Technical Service Intern",
      location: "Çankırı, Türkiye",
      period: "Internship Period",
      bullets: [
        "Handled hardware diagnostics, maintenance, and workstation system provisioning across university faculties.",
        "Troubleshot enterprise local area network connectivity, operating system configurations, and peripheral hardware.",
        "Maintained technical documentation and provided rapid hardware resolution for institutional infrastructure.",
      ],
    },
  },
  education: {
    sectionNum: "05",
    sectionTitle: "Education & Academic Credentials",
    sectionSubtitle:
      "Rigorous foundations in Computer Engineering and applied research.",
    degreeLevel: "Undergraduate Degree",
    classOf: "Class of 2026",
    institution: "Çankırı Karatekin University",
    degreeName: "Bachelor of Science (B.Sc.) in Computer Engineering",
    details: [
      "Core curriculum: Algorithms, Data Structures, Operating Systems, Database Management, Software Engineering & AI.",
      "Qualified for the European Erasmus+ mobility program.",
    ],
    erasmusNote: "Erasmus+ Mobility Qualified Candidate",
    capstoneTag: "Graduation Capstone Project",
    capstoneSubtitle: "Acoustic Audio AI / Machine Learning",
    capstoneCoreDisciplines: "Core Engineering Disciplines:",
    capstoneShowcase: "Engineering Graduation Showcase",
  },
  skills: {
    sectionNum: "06",
    sectionTitle: "Technical Competencies",
    sectionSubtitle:
      "Languages, frameworks, systems, and tools applied across academic and practical projects.",
    verifiedCompetency: "Verified Competency",
    activeStatus: "● Active",
    categories: {
      languages: "Languages",
      frontend: "Frontend",
      backend: "Backend",
      aiMl: "AI & Machine Learning",
      tools: "Tools & Infrastructure",
    },
  },
  kinetic: {
    text: "SYSTEMS · ARCHITECTURE · SOFTWARE · INTELLIGENCE · ALGORITHMS ·",
  },
  contact: {
    pill: "GET IN TOUCH",
    headingLine1: "Let's Build",
    headingLine2: "Something.",
    description:
      "Have a project, opportunity, or interested in collaborating on AI agents, machine learning, or modern web systems?",
    copyEmail: "Copy Email",
    copied: "Copied to Clipboard!",
    emailUponRequest: "Email Upon Request",
    emailSetupInfo:
      "Email is ready to be configured in .env.local (NEXT_PUBLIC_CONTACT_EMAIL)",
    emailClipboardError: "Could not access clipboard. Please copy manually.",
    downloadCv: "Download CV",
    cvTr: "Türkçe CV",
    cvEn: "English CV",
    cvUponRequest: "CV Upon Request",
    cvPendingTooltip: "CV will be downloadable when added to /public/cv/",
    locationNote: "Türkiye",
    classNote: "B.Sc. Computer Engineering (2026)",
  },
  footer: {
    roleInfo: "Computer Engineer & Software Developer",
    builtWith: "Engineered with Next.js, TypeScript & Tailwind CSS",
    backToTop: "Back to Top",
  },
};
