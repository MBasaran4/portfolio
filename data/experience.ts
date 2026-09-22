import { ExperienceItem, EducationItem } from "@/types";

export const experienceData: ExperienceItem[] = [
  {
    id: "dijital-adam",
    role: "Software Engineering Intern",
    company: "Dijital Adam",
    location: "Balıkesir, Türkiye",
    period: "Internship Period",
    type: "Internship",
    description: [
      "Engaged in full-stack web application development workflows using modern JavaScript/TypeScript ecosystems.",
      "Collaborated on front-end user interfaces, component modularity, and responsive layout implementations.",
      "Participated in agile code reviews, version control discipline, and bug resolution cycles.",
    ],
    technologies: ["JavaScript", "TypeScript", "React", "CSS", "Git"],
  },
  {
    id: "caku-it",
    role: "Hardware & IT Technical Service Intern",
    company: "Çankırı Karatekin University — IT Department",
    location: "Çankırı, Türkiye",
    period: "Internship Period",
    type: "Internship",
    description: [
      "Handled hardware diagnostics, maintenance, and workstation system provisioning across university faculties.",
      "Troubleshot enterprise local area network connectivity, operating system configurations, and peripheral hardware.",
      "Maintained technical documentation and provided rapid hardware resolution for institutional infrastructure.",
    ],
    technologies: ["Hardware Diagnostics", "Networking", "System Administration", "IT Support"],
  },
];

export const educationData: EducationItem = {
  id: "caku-engineering",
  degree: "Bachelor of Science (B.Sc.)",
  field: "Computer Engineering",
  institution: "Çankırı Karatekin University",
  graduationYear: "2026",
  details: [
    "Core curriculum: Algorithms, Data Structures, Operating Systems, Database Management, Software Engineering & AI.",
    "Qualified for the European Erasmus+ mobility program.",
  ],
  graduationProject: {
    title: "Car Sound Fault Detection",
    description:
      "Acoustic machine learning system diagnosing vehicle mechanical anomalies from engine and mechanical sound recordings.",
    focus: [
      "Digital Signal Processing",
      "MFCC Feature Extraction",
      "Supervised Machine Learning",
      "Acoustic Classification",
    ],
  },
};
