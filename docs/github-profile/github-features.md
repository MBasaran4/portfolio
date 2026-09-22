# GitHub Features & License Audit

This document outlines the license status and GitHub feature recommendations (Issues, Discussions, Wiki, Projects) for Mücahit Başaran's public GitHub repositories.

---

## 1. Open Source License Audit & Recommendations

### Tradeoff Analysis
| License | Permissions | Requirements | Best Suited For |
| :--- | :--- | :--- | :--- |
| **MIT** | Highly permissive: commercial use, modification, distribution, private use. | Include copyright and license notice. | Frontend applications, utilities, starter kits, personal portfolios. |
| **Apache-2.0** | Permissive with explicit grant of patent rights and trademark restrictions. | Include copyright, state changes, license notice. | Developer tools, security harnesses, enterprise libraries, AI agent frameworks. |
| **No License (All Rights Reserved)** | Default copyright; others cannot copy, modify, or distribute the code. | N/A | Proprietary assets, personal resume data, unreleased academic intellectual property. |

### Repository-Specific License Recommendations

1. **HesapKitap (`MBasaran4/HesapKitap`)**:
   - **Recommendation**: **MIT License**.
   - **Rationale**: HesapKitap is a public utility application intended to demonstrate clean React/TypeScript modular architecture. MIT maximizes adoption, allows others to inspect or fork calculators easily, and is the industry standard for lightweight web tools.

2. **AgentVerge (`MBasaran4/agentverge`)**:
   - **Recommendation**: **Apache-2.0 License** (or MIT).
   - **Rationale**: AgentVerge is an AI agent security and evaluation harness. Apache-2.0 provides express patent grants and protects against contributor patent claims, making it ideal for developer infrastructure and security-oriented tooling.

3. **Developer Portfolio (`MBasaran4/MBasaran`)**:
   - **Recommendation**: **MIT License** for the code structure, with explicit notice that personal branding, bio, and likeness are reserved.
   - **Rationale**: Enables other developers to learn from the Next.js 16 / Tailwind v4 / i18n implementation while maintaining ownership over personal identity.

4. **Car Sound Fault Detection (Capstone)**:
   - **Recommendation**: Retain **All Rights Reserved** or consult thesis advisor prior to applying an open-source license, ensuring university graduation requirements and research publication rights are preserved.

---

## 2. GitHub Issues & Discussions Strategy

### HesapKitap
- **Issues**: **ENABLE**
  - *Purpose*: Allows users to report arithmetic edge cases, currency/calculation bugs, or request new calculator utilities.
  - *Template Recommendation*: Simple bug report and feature request issue templates.
- **Discussions**: **DISABLE**
  - *Rationale*: Overhead of unmonitored discussion forums is counterproductive for a utility suite. Clear issues provide actionable tracking.

### AgentVerge
- **Issues**: **ENABLE**
  - *Purpose*: Essential for a developer framework. Tracks evaluation edge cases, agent runner compatibility, API changes, and security testing harness bugs.
  - *Template Recommendation*: Bug report with reproduction steps, and Feature/Benchmark proposal.
- **Discussions**: **DISABLE** (initially)
  - *Rationale*: Until the project reaches external contributor scale, discussions fragment communication. Keep all technical feedback organized under GitHub Issues.

### Developer Portfolio
- **Issues**: **DISABLE** (or restrict to bug tracking)
  - *Rationale*: A personal portfolio should point visitors directly to email ([mucahitbasaran785@gmail.com](mailto:mucahitbasaran785@gmail.com)) or LinkedIn rather than hosting an issue tracker.
- **Discussions**: **DISABLE**

---

## Summary Matrix

| Repository | Recommended License | Issues | Discussions | Wiki |
| :--- | :--- | :--- | :--- | :--- |
| **HesapKitap** | MIT | Enabled | Disabled | Disabled |
| **AgentVerge** | Apache-2.0 / MIT | Enabled | Disabled | Disabled |
| **Portfolio** | MIT (code) | Disabled | Disabled | Disabled |
| **Car Sound ML** | Academic Review First | Disabled | Disabled | Disabled |
