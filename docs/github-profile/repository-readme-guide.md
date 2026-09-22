# Repository README Audit & Recommendations

This guide provides professional, production-grade README templates and audits for Mücahit Başaran's standalone project repositories (`HesapKitap` and `AgentVerge`). Since those repositories live outside this local workspace, these templates are prepared here for copy-pasting directly into their respective GitHub repositories.

---

## 1. HesapKitap (`MBasaran4/HesapKitap`) README Template

```markdown
# HesapKitap

> Modular, multilingual calculation utility web platform built with React, TypeScript, and Vite.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-hesap--kitap.vercel.app-06b6d4?style=flat-square)](https://hesap-kitap.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## Overview

**HesapKitap** is a consolidated web utility designed to replace fragmented, ad-heavy calculation websites with a single, clean, accessible interface. It gathers practical everyday calculators and domain-specific computation tools into a modular, responsive architecture.

## Features

- **Modular Architecture**: Each calculator operates as an isolated, testable, self-contained functional component.
- **Multiple Domain Utilities**: Financial, date/time, unit conversion, and everyday mathematical utilities in one place.
- **Bilingual (i18n)**: Native Turkish and English support with fluid locale switching.
- **Theme Support**: Built-in dark mode and light mode adhering to user system preferences.
- **Mobile-First Responsive**: Designed for fast, responsive touch interactions on mobile phones and desktops.
- **Zero Ads & Zero Tracking**: Fast, clean, distraction-free user experience.

## Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: CSS Modules / Modern CSS / Tailwind CSS
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation
```bash
git clone https://github.com/MBasaran4/HesapKitap.git
cd HesapKitap
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

## Project Structure
```
src/
├── components/     # Reusable UI components (Navbar, ThemeToggle, etc.)
├── calculators/    # Modular calculator modules
├── i18n/           # Translation dictionaries (TR / EN)
├── styles/         # Global styles and theme variables
└── App.tsx         # Main router and layout
```

## License
Distributed under the [MIT License](LICENSE).

## Author
**Mücahit Başaran**  
- Portfolio: [mbasaran.dev](https://mbasaran.dev)  
- GitHub: [@MBasaran4](https://github.com/MBasaran4)  
- Email: [mucahitbasaran785@gmail.com](mailto:mucahitbasaran785@gmail.com)
```

---

## 2. AgentVerge (`MBasaran4/agentverge`) README Template

```markdown
# AgentVerge

> Developer-focused security, evaluation, and reliability framework for autonomous AI agents and tool pipelines.

[![GitHub Repo](https://img.shields.io/badge/GitHub-MBasaran4%2Fagentverge-06b6d4?style=flat-square&logo=github)](https://github.com/MBasaran4/agentverge)
[![Python Version](https://img.shields.io/badge/Python-3.10%2B-blue?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-teal.svg?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active%20Development-amber?style=flat-square)]()

---

## Overview

As autonomous AI agents and LLM tool-calling workflows are integrated into production environments, ensuring deterministic reliability, safety boundaries, and prompt containment is critical.

**AgentVerge** provides automated test harnesses, behavioral benchmarks, and CI/CD validation hooks to detect unintended agent behaviors, hallucinated tool calls, prompt leakage, and reliability failures before deployment.

## Key Capabilities

- **Behavioral Evaluation Harness**: Test autonomous agent runs against deterministic assertion suites.
- **Tool-Calling Verification**: Validate argument integrity, schema enforcement, and tool execution boundaries.
- **Safety & Prompt Containment**: Test resistance against prompt injection and unauthorized context leakage.
- **CI/CD Integration**: Lightweight runner hooks for GitHub Actions to gatekeep deployments upon benchmark failure.
- **Developer-Centric API**: Pythonic test definitions inspired by standard assertion libraries.

## Tech Stack

- **Core**: Python 3.10+
- **Evaluation Engine**: Pydantic, Pytest hooks, Asyncio
- **Integrations**: LangChain / LlamaIndex / Custom Agent runners

## Getting Started

### Installation
```bash
git clone https://github.com/MBasaran4/agentverge.git
cd agentverge
pip install -e .
```

### Quick Usage Example
```python
from agentverge import AgentHarness, SecurityAssertion

harness = AgentHarness(agent_target=my_agent)
result = harness.evaluate([
    SecurityAssertion.no_system_prompt_leak(),
    SecurityAssertion.strict_tool_whitelist(["search_database", "format_output"])
])

assert result.passed, f"Agent evaluation failed: {result.errors}"
```

## Roadmap

- [x] Core evaluation test runner architecture
- [x] Basic tool call schema validator
- [ ] Multi-turn conversation jailbreak benchmark suite
- [ ] GitHub Action pre-built check runner
- [ ] HTML/Markdown evaluation report generation

## License
Distributed under the [Apache 2.0 License](LICENSE).

## Author
**Mücahit Başaran**  
- Portfolio: [mbasaran.dev](https://mbasaran.dev)  
- GitHub: [@MBasaran4](https://github.com/MBasaran4)  
- Email: [mucahitbasaran785@gmail.com](mailto:mucahitbasaran785@gmail.com)
```
