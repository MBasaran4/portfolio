export type Locale = "tr" | "en";

export interface Dictionary {
  locale: Locale;
  nav: {
    about: string;
    projects: string;
    experience: string;
    skills: string;
    contact: string;
  };
  hero: {
    status: string;
    titleFirst: string;
    titleLast: string;
    titleRole: string;
    description: string;
    viewProjects: string;
    downloadCv: string;
    cvTr: string;
    cvEn: string;
    cvUponRequest: string;
    contact: string;
    scrollToExplore: string;
    tags: {
      softwareDev: string;
      modernWeb: string;
      aiMl: string;
    };
  };
  about: {
    sectionNum: string;
    sectionTitle: string;
    sectionSubtitle: string;
    leadBio: string;
    degreeDesc: string;
    philosophyDesc: string;
    degreeBadge: string;
    currentlyBuildingTitle: string;
    currentlyBuildingDesc: string;
    currentlyBuildingSub: string;
    exploringTitle: string;
    exploringDesc: string;
    exploringSub: string;
    interestedInTitle: string;
    interestedInDesc: string;
    interestedInSub: string;
  };
  whatIBuild: {
    badge: string;
    title: string;
    webTitle: string;
    webTagline: string;
    webDesc: string;
    aiTitle: string;
    aiTagline: string;
    aiDesc: string;
    toolsTitle: string;
    toolsTagline: string;
    toolsDesc: string;
  };
  projects: {
    sectionNum: string;
    sectionTitle: string;
    sectionSubtitle: string;
    statusCompleted: string;
    statusInDev: string;
    statusResearch: string;
    githubButton: string;
    liveDemoButton: string;
    previewBadge: string;
    previewSchematic: string;
    illustrativePreview: string;
    items: {
      hesapkitap: {
        subtitle: string;
        description: string;
        longDescription: string;
        highlights: string[];
      };
      agentverge: {
        subtitle: string;
        description: string;
        longDescription: string;
        highlights: string[];
      };
      carsound: {
        subtitle: string;
        description: string;
        longDescription: string;
        highlights: string[];
      };
    };
  };
  github: {
    sectionNum: string;
    sectionTitle: string;
    sectionSubtitle: string;
    viewProfile: string;
    setupTitle: string;
    setupMessage: string;
    setupEnvHint: string;
    unavailable: string;
    exploreDirectly: string;
    noRepos: string;
    noDescription: string;
  };
  experience: {
    sectionNum: string;
    sectionTitle: string;
    sectionSubtitle: string;
    dijitalAdam: {
      role: string;
      location: string;
      period: string;
      bullets: string[];
    };
    cakuIt: {
      role: string;
      location: string;
      period: string;
      bullets: string[];
    };
  };
  education: {
    sectionNum: string;
    sectionTitle: string;
    sectionSubtitle: string;
    degreeLevel: string;
    classOf: string;
    institution: string;
    degreeName: string;
    details: string[];
    erasmusNote: string;
    capstoneTag: string;
    capstoneSubtitle: string;
    capstoneCoreDisciplines: string;
    capstoneShowcase: string;
  };
  skills: {
    sectionNum: string;
    sectionTitle: string;
    sectionSubtitle: string;
    verifiedCompetency: string;
    activeStatus: string;
    categories: {
      languages: string;
      frontend: string;
      backend: string;
      aiMl: string;
      tools: string;
    };
  };
  kinetic: {
    text: string;
  };
  contact: {
    pill: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    copyEmail: string;
    copied: string;
    emailUponRequest: string;
    emailSetupInfo: string;
    emailClipboardError: string;
    downloadCv: string;
    cvTr: string;
    cvEn: string;
    cvUponRequest: string;
    cvPendingTooltip: string;
    locationNote: string;
    classNote: string;
  };
  footer: {
    roleInfo: string;
    builtWith: string;
    backToTop: string;
  };
}
