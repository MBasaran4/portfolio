# Phase 04 — Featured Projects Report

## Completed
- Created typed project data layer (`data/projects.ts`):
  1. **HesapKitap**: Modular calculation tools platform in React, TypeScript, Vite, i18n, and responsive CSS.
  2. **AgentGuard**: Developer tooling framework for AI Agent evaluation, security benchmarking, reliability, and CI/CD gatekeeping (Status: In Development).
  3. **Car Sound Fault Detection**: B.Sc. Computer Engineering graduation project diagnosing mechanical automotive anomalies using acoustic audio signals, MFCC feature extraction, and ML classification.
- Created `ProjectVisualPreview` (`components/ui/ProjectVisualPreview.tsx`):
  - Strictly adhering to the anti-fabrication mandate: No fake application UI screenshots.
  - Built clean vector-based technical graphics for each project domain:
    - Code Interface schematic (`calculator.module.ts`) for HesapKitap.
    - Architectural Pipeline schematic (Agent Pipeline -> Security Harness -> CI/CD Gate) for AgentGuard.
    - Acoustic Waveform and Spectrum schematic for Car Sound Fault Detection.
    - Each graphic is explicitly stamped with an *"Illustrative Preview"* badge.
- Built `ProjectCard` (`components/ui/ProjectCard.tsx`):
  - Alternating layout (`reverse`), status pill indicators, highlight bullet points, tech stack tags, and conditional GitHub / Live Demo links.
- Built `FeaturedProjects` (`components/sections/FeaturedProjects.tsx`) and mounted on `app/page.tsx`.

## Files Created
- `data/projects.ts`
- `components/ui/ProjectVisualPreview.tsx`
- `components/ui/ProjectCard.tsx`
- `components/sections/FeaturedProjects.tsx`
- `docs/progress/phase-04-projects.md`

## Files Modified
- `app/page.tsx`

## Dependencies Added
- None.

## Decisions
- Ensured zero fake statistics, stars, user counts, or fabricated screenshots.
- Only render GitHub and Live Demo action anchors when active URLs are provided via environment variables or data config, avoiding broken links.

## Problems
- `react/jsx-no-comment-textnodes` lint error from inline comment in `ProjectVisualPreview.tsx`.

## Solutions
- Wrapped comment text within JSX string expression `{"// ..."}`. Lint now passes with 0 errors.

## Validation
- `npm run lint` passed with zero errors.

## Next Phase
- **Phase 5 — GitHub**: Implement Server Component GitHub integration with cached fetch (`revalidate: 3600`), setup/unconfigured state handling, rate-limit resilience, and repository cards.
