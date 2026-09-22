# GitHub Repository Social Preview Card Guidelines

This document provides visual design specifications for creating Open Graph / Social Preview cards for Mücahit Başaran's repositories. When shared on Twitter/X, LinkedIn, Discord, or Slack, GitHub displays these cards (recommended dimensions: **1280 × 640 px**, 2:1 ratio).

---

## 1. Brand Aesthetics & Palette

The visual cards should seamlessly match the developer portfolio's obsidian/cyan engineering theme:

- **Background Base**: `#090b10` (Obsidian Deep Dark) with subtle `#131822` (Card surface) container or soft radial glow.
- **Primary Accent**: `#06b6d4` (Electric Cyan — hex 6, 182, 212)
- **Secondary Accent**: `#00f5d4` (Mint Teal — hex 0, 245, 212)
- **Text Primary**: `#f8fafc` (Slate 50 — bright white/silver)
- **Text Muted**: `#94a3b8` (Slate 400 — clean neutral gray)
- **Grid / Technical Accents**: `rgba(6, 182, 212, 0.12)` subtle vector grid lines or corner crosshairs `[+]`.

---

## 2. Layout Structure & Visual Hierarchy

Each card should follow a clean 3-layer vertical layout:

```
+------------------------------------------------------------------+
|  [ MB / MÜCAHİT BAŞARAN ]                       [ REPO CATEGORY ]|
|                                                                  |
|                                                                  |
|   PROJECT NAME                                                   |
|   One-line clear description of engineering value.               |
|                                                                  |
|                                                                  |
|  [ Tag 1 ]  [ Tag 2 ]  [ Tag 3 ]             github.com/MBasaran4|
+------------------------------------------------------------------+
```

### Hierarchy Breakdown:
1. **Top Header**:
   - Left: `MB / MÜCAHİT BAŞARAN` (font-mono, 14px uppercase, color: `#06b6d4`)
   - Right: Category pill (e.g. `[WEB APPLICATION]`, `[AI DEVELOPER TOOLS]`, `[AI & SYSTEMS]`)
2. **Center Core (Hero)**:
   - **Project Name**: Bold, clean typography (48–56px, color: `#f8fafc`).
   - **Tagline / Value Statement**: Modern sans-serif (20–24px, color: `#94a3b8`, max 2 lines).
3. **Bottom Footer**:
   - Technology badges styled as minimal pill outlines (`border: 1px solid rgba(6,182,212,0.3)`):
     - E.g. `React`, `TypeScript`, `Vite` for HesapKitap.
     - E.g. `Python`, `AI Agents`, `CI/CD` for AgentVerge.
   - Right: `github.com/MBasaran4` in monospace.

---

## 3. Recommended Specifications for Key Repositories

### A. HesapKitap
- **Title**: `HesapKitap`
- **Category**: `WEB APPLICATION / TOOLKIT`
- **Description**: `Modular, accessible calculation tools for practical everyday and domain-specific tasks.`
- **Tech Pills**: `React` · `TypeScript` · `Vite` · `i18n` · `Tailwind`

### B. AgentVerge
- **Title**: `AgentVerge`
- **Category**: `AI DEVELOPER TOOLS`
- **Description**: `Security, evaluation and reliability harness for autonomous AI agents and tool pipelines.`
- **Tech Pills**: `Python` · `AI Agents` · `LLM Evaluation` · `CI/CD` · `Testing`

### C. Developer Portfolio (`MBasaran`)
- **Title**: `Mücahit Başaran — Portfolio`
- **Category**: `PERSONAL PORTFOLIO`
- **Description**: `Computer Engineer & Software Developer · Next.js 16 App Router · TypeScript · Bilingual i18n`
- **Tech Pills**: `Next.js 16` · `React 19` · `TypeScript` · `Tailwind v4`

---

## 4. How to Upload to GitHub

1. Generate or export the 1280 × 640 PNG image (Figma, Canva, or Inkscape).
2. Go to the repository on GitHub.
3. Click **Settings** > **General**.
4. Scroll down to **Social preview**.
5. Click **Edit** > **Upload an image**.
6. Select your exported PNG file.
