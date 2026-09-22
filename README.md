# Mücahit Başaran — Personal Developer Portfolio

> Computer Engineer & Software Developer · Çankırı Karatekin University (Class of 2026)

A modern, premium, minimalist personal developer portfolio engineered with **Next.js App Router**, **TypeScript**, and **Tailwind CSS**. Built following an **80% minimalist + 20% developer aesthetic** with dark theme tokens, subtle ambient radial cyan lighting, a reactive living digital canvas, and complete **Turkish & English** internationalization.

---

## Overview

This portfolio introduces Mücahit Başaran's work across software engineering, modern web applications, artificial intelligence, and developer tooling. It answers three essential questions instantly:
1. **Who is this engineer?** (Computer Engineer & Software Developer, ÇAKÜ 2026).
2. **What have they built?** (HesapKitap, AgentVerge, Car Sound Fault Detection, open source GitHub repositories).
3. **How do I connect?** (Copy email with clipboard feedback, LinkedIn, GitHub, CV download).

---

## Key Features

- **Turkish & English (i18n)**: Full bilingual support via `/tr` and `/en` static routes with active language switcher in the navbar. Preserves active section anchors on switch.
- **Strict Authenticity**: Zero fabricated statistics, fake user counts, or fake reviews.
- **Factually Honest Previews**: Neutral vector architectural schematics rather than fake screenshots.
- **Independent Project Links**: Distinct `[GitHub ↗]` and `[Live Demo ↗]` action buttons that only appear when genuine URLs are configured (no placeholder text, no broken links).
- **Single Contact Navigation**: Clean, balanced navbar layout with zero duplicate navigation targets.
- **Reactive Living Background**: Subtle Canvas 2D particle/neural network field behind content that gently reacts to cursor motion with smooth inertia and soft ambient glow (calibrated to ~6–8% visual intensity).
- **Next.js App Router Architecture**: Over 80% Server Components with minimal client islands (`Lenis` smooth scroll, `ReactiveBackground`, `CopyEmail`, `Navbar` drawer).
- **Resilient GitHub Integration**: Server-side fetch with 1-hour ISR caching (`revalidate: 3600`). Gracefully falls back to a clean setup guide if `GITHUB_USERNAME` is unconfigured, and handles rate-limits gracefully.
- **Graceful CV Management**: Checks `/public/cv/` for `mucahit_basaran_cv.pdf`. If pending, disables the button with an informative tooltip instead of serving broken 404 links.
- **WCAG Accessibility & Performance**: Fully honors `prefers-reduced-motion` in animations and smooth scrolling, visible focus indicators, semantic HTML landmarks, and zero raster image transfer overhead.
- **SEO & Structured Data**: Built-in OpenGraph cards, Twitter cards, `proxy.ts`, `robots.ts`, `sitemap.ts`, and Schema.org `Person` JSON-LD structured data for both locales.

---

## Tech Stack

### Core
- **Framework**: Next.js 16 (App Router with Turbopack & Proxy convention)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS v4 with custom dark cyan tokens
- **Icons**: Lucide React + custom SVG vector icons (`components/ui/Icons.tsx`)
- **Smooth Scrolling**: Lenis (with reduced motion detection)

### Data & i18n Architecture
- `lib/i18n/`: Typed dictionary system (`tr.ts`, `en.ts`) providing full translations.
- `data/personal.ts`: Central personal identity and social profile configuration.
- `data/projects.ts`: Typed records for featured projects (HesapKitap, AgentVerge, Car Sound Fault Detection).
- `data/experience.ts`: Internship timelines and academic credentials.
- `data/skills.ts`: Categorized technical competencies (no arbitrary percentage bars).
- `lib/github.ts`: Server-side cached GitHub REST API client.

---

## Project Structure

```text
app/
├── [locale]/
│   ├── layout.tsx      # Root localized layout (fonts, html lang, JSON-LD, frames)
│   └── page.tsx        # Localized page assembling all portfolio sections
├── globals.css         # Theme tokens, dark cyan palette, technical grid
├── robots.ts           # Dynamic search engine crawler policies
└── sitemap.ts          # XML sitemap generator (supports /tr and /en)
components/
├── animation/
│   ├── KineticText.tsx     # Section transition outline separator
│   └── ScrollProgress.tsx  # Viewport reading progress indicator
├── layout/
│   ├── BackgroundLayers.tsx# Ambient lights + Reactive living canvas + technical grid
│   ├── Footer.tsx          # Minimal engineering footer
│   ├── Navbar.tsx          # Fixed glassmorphic navigation + language switcher
│   ├── ReactiveBackground.tsx # Canvas 2D organic living particle field
│   └── SmoothScroll.tsx    # Lenis momentum smooth scroll
├── sections/
│   ├── About.tsx           # Narrative, education & status cards
│   ├── Contact.tsx         # "LET'S BUILD SOMETHING" action section
│   ├── Education.tsx       # B.Sc. degree & Car Sound Capstone
│   ├── Experience.tsx      # Vertical internship timeline
│   ├── FeaturedProjects.tsx# Curated project showcases
│   ├── GitHubProjects.tsx  # Live / setup GitHub repository stream
│   ├── Hero.tsx            # High-impact identity & CTAs
│   └── WhatIBuild.tsx      # Web Apps, AI & Developer Tools
├── seo/
│   └── JsonLd.tsx          # Schema.org Person structured data
└── ui/
    ├── Badge.tsx           # Technical category pills
    ├── Button.tsx          # Primary, secondary, outline, ghost variants
    ├── CopyEmail.tsx       # Asynchronous clipboard with toast feedback
    ├── Icons.tsx           # Lightweight SVG Github and Linkedin icons
    ├── ProjectCard.tsx     # Alternating project showcase card
    ├── ProjectVisualPreview.tsx # Neutral vector technical preview schematics
    └── SectionHeading.tsx  # Technical numbered section headers
data/
├── experience.ts
├── personal.ts
├── projects.ts
└── skills.ts
docs/
└── progress/           # Phase reports (Phase 00 to Phase 11)
lib/
├── github.ts
├── i18n/               # Dictionary types and translations (tr, en)
└── utils.ts
proxy.ts                # Next.js 16 locale routing proxy
public/
├── cv/                 # Store authentic resume PDF here
└── projects/           # Static project assets
types/
└── index.ts            # TypeScript interfaces
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and set your credentials:

```bash
cp .env.example .env.local
```

Key variables:
- `GITHUB_USERNAME`: Your GitHub username (enables live repository streaming).
- `GITHUB_TOKEN`: (Optional) GitHub personal access token for higher rate limits.
- `NEXT_PUBLIC_CONTACT_EMAIL`: Email address for copy email button.
- `NEXT_PUBLIC_LINKEDIN_URL`: LinkedIn profile URL.
- `NEXT_PUBLIC_GITHUB_URL`: GitHub profile URL.
- `NEXT_PUBLIC_SITE_URL`: Base URL for OpenGraph and sitemap.
- `NEXT_PUBLIC_HESAPKITAP_GITHUB` & `NEXT_PUBLIC_HESAPKITAP_DEMO`: Repository and demo URLs for HesapKitap.
- `NEXT_PUBLIC_AGENTVERGE_GITHUB`: Repository URL for AgentVerge.
- `NEXT_PUBLIC_CARSOUND_GITHUB`: Repository URL for Car Sound Fault Detection.

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application (automatically routes to `/tr`).

### 3. Lint Code
```bash
npm run lint
```

### 4. Production Build
```bash
npm run build
npm run start
```

---

## Deployment

The project is fully optimized for zero-configuration deployment on **Vercel**:
1. Push your repository to GitHub.
2. Import the project in Vercel.
3. Add your environment variables in the Vercel project dashboard.
4. Deploy!

---

## License

This project is personal intellectual property of **Mücahit Başaran**. All rights reserved.
