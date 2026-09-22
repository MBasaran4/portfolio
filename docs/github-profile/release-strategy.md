# Release & Tag Strategy (SemVer & Keep a Changelog)

This document outlines the versioning, tagging, and release milestone strategy for Mücahit Başaran's public GitHub repositories.

---

## 1. Versioning Standard

All repositories should follow [Semantic Versioning 2.0.0](https://semver.org/):
```
vMAJOR.MINOR.PATCH
```
- **MAJOR (`v1.0.0`)**: Incompatible API breaking changes or major project restructuring.
- **MINOR (`v0.1.0`, `v0.2.0`)**: Backwards-compatible new features, calculators, or evaluation benchmarks.
- **PATCH (`v0.1.1`, `v0.1.2`)**: Backwards-compatible bug fixes, typo corrections, dependency upgrades.

Initial pre-1.0 development should utilize `0.y.z` where `0.1.0` marks the first stable baseline.

---

## 2. Recommended Initial Release Milestones (`v0.1.0`)

### A. HesapKitap — `v0.1.0` (Modular Calculator Baseline)
- **Tag**: `v0.1.0`
- **Release Title**: `v0.1.0 — Initial Public Release of HesapKitap Web Suite`
- **Release Purpose**:
  Marks the completion of the core modular calculator engine, lightweight state management, dark mode, multi-language internationalization (TR/EN), and responsive mobile/desktop interfaces.
- **Sample Changelog (`CHANGELOG.md`)**:
  ```markdown
  # Changelog
  All notable changes to this project will be documented in this file.
  The format is based on [Keep a Changelog](https://keepachangelog.com/).

  ## [0.1.0] - 2026-09-14
  ### Added
  - Core modular calculation engine with isolated calculation units.
  - Responsive daily and specialized calculators.
  - Multi-language support (Turkish & English).
  - Theme switching with dark mode and persistent user preferences.
  - Deployment configuration for Vercel.
  ```

### B. AgentVerge — `v0.1.0` (Core Harness Alpha)
- **Tag**: `v0.1.0`
- **Release Title**: `v0.1.0 — AgentVerge Evaluation Harness Baseline`
- **Release Purpose**:
  Establishes the foundation of the AI agent security and evaluation framework, including basic deterministic safety checks, tool-calling validation, and developer CLI/API integration points.
- **Sample Changelog**:
  ```markdown
  ## [0.1.0] - 2026-09-14
  ### Added
  - Agent test harness for deterministic response validation.
  - Basic tool-call integrity checks.
  - Python test runner integration hooks.
  - Initial documentation and security evaluation guidelines.
  ```

### C. Developer Portfolio (`MBasaran`) — `v1.0.0`
- **Tag**: `v1.0.0`
- **Release Title**: `v1.0.0 — Mücahit Başaran Developer Portfolio`
- **Release Purpose**:
  Initial complete release of the bilingual engineering portfolio built with Next.js 16 App Router, Tailwind CSS v4, Lucide React, Lenis, and server-side cached GitHub integration.

---

## 3. Creating Releases on GitHub (Manual Workflow)

1. Ensure the local branch is clean and all tests/builds pass:
   ```bash
   npm run lint
   npm run build
   ```
2. Create and push an annotated git tag:
   ```bash
   git tag -a v0.1.0 -m "Release v0.1.0"
   git push origin v0.1.0
   ```
3. In the GitHub repository page, click **Releases** > **Draft a new release**.
4. Select the tag `v0.1.0`.
5. Enter the **Release title** and paste the relevant **Changelog** section.
6. Click **Publish release**.
