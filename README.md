<div align="center">

# CodeKong 🦍
**Alternative Credit Scoring (Multi‑Step React Application)**

[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com)
[![Tests](https://img.shields.io/badge/Tests-Vitest-6E9F18)](https://vitest.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Modern, privacy‑friendly alternative credit scoring demo: structured multi‑step intake, modular factor scoring, runtime validation, accessibility enhancements, and CI‑ready codebase.

[▶️ Live Demo](https://lovely-souffle-001385.netlify.app/) · [🐛 Issues](../../issues)

</div>

## ✨ Feature Highlights

- Multi‑step credit application wizard with local persistence (resume later)
- Full runtime validation via Zod (schema‑driven + composite user profile)
- Modular scoring engine (separate factor calculators: rent, utility, bank, employment, education)
- Deterministic credit score + qualitative recommendation output
- Accessibility: skip link, focus management, aria‑live status announcements
- Performance: code‑split steps (React.lazy) + prefetching next step bundle
- Resilient data layer: hydrated + validated localStorage state with versioned key
- Type‑safe service + UI boundary (central hook powering all forms)
- Continuous Integration workflow (lint, typecheck, test, build)
- Defensive scoring (clamped ranges & negative input safeguards)

## 🧮 Scoring Factors (High Level)
| Factor     | Inputs Considered                                                 | Notes                                                       |
|-----------|-------------------------------------------------------------------|-------------------------------------------------------------|
| Rent       | Tenure, late & early payments, landlord rating                    | Rewards consistency & low delinquency                       |
| Utilities  | Payment punctuality, diversity of utility types                   | Diversity signals stability                                 |
| Banking    | Income vs expenses, liquidity (balances), overdrafts, account age | Penalizes overdrafts; liquidity boosts resilience           |
| Employment | Current tenure, total experience, employment type, industry      | Stability weighted over job title                           |
| Education  | Highest degree, graduation recency, field signal                  | Higher degrees & recent study add capped incremental lift   |

Each factor returns a weighted impact; aggregate is normalized (0–1000) and tiered.

## 🗂️ Project Structure
```bash
code_kong/
├── index.html                 # HTML shell loaded by Vite
├── package.json               # Scripts & dependencies
├── vite.config.ts             # Vite build/dev configuration
├── vitest.config.ts           # Vitest test runner config
├── vitest.setup.ts            # Test environment setup (jsdom, matchers)
├── tailwind.config.js         # Tailwind design system config
├── postcss.config.js          # PostCSS pipeline
├── tsconfig.json              # Root TS config (references)
├── tsconfig.app.json          # TS app compilation config
├── tsconfig.node.json         # TS node / tooling config
├── eslint.config.js           # Flat ESLint configuration
├── LICENSE                    # MIT license text
├── README.md
├── Webpage Snapshots/
    ├── Banking Information Screenshot.jpeg       # Root snapshot assets (UI examples)
    ├── Education History Screenshot.jpeg         # Root snapshot assets (UI examples)
    ├── Employment History Screenshot.jpeg        # Root snapshot assets (UI examples)
    ├── Financial Coaching Feature Screenshot.jpeg # Root snapshot assets (UI examples)
    ├── Personal Information Screenshot.jpeg       # Root snapshot assets (UI examples)
    ├── Rent Payment History Screenshot.jpg       # Root snapshot assets (UI examples)
    ├── Score Breakdown Screenshot.jpeg           # Root snapshot assets (UI examples)
    ├── Utility Payment History Screenshot.jpeg                 
└── src/                       # Project documentation
	├── main.tsx               # React entrypoint (mount root)
	├── App.tsx                # App shell & multi‑step flow
	├── index.css              # Global Tailwind layer imports
	├── vite-env.d.ts          # Vite type declarations
	├── components/
	│   ├── ProgressBar.tsx    # Step progress indicator
	│   ├── ThemeToggle.tsx    # Light/Dark theme switch
	│   ├── ErrorBoundary.tsx  # Runtime error isolation
	│   ├── WelcomeScreen.tsx  # Initial landing screen
	│   ├── CreditScoreResult.tsx # Score + recommendation display
	│   ├── UserProfile.tsx    # Aggregated user summary (optional view)
	│   └── forms/             # Step form components (validated)
	│       ├── PersonalInfoForm.tsx
	│       ├── RentHistoryForm.tsx
	│       ├── UtilityHistoryForm.tsx
	│       ├── BankDataForm.tsx
	│       ├── EmploymentForm.tsx
	│       └── EducationForm.tsx
	├── hooks/
	│   └── useCreditApplicationForm.ts # Reducer state + persistence & validation
	├── services/
	│   ├── creditScoring.ts   # Aggregates factor calculators & derives final score
	│   ├── creditScoring.test.ts # Core scoring service tests
	│   └── factors/           # Individual scoring factor modules + tests
	│       ├── bank.ts
	│       ├── education.ts
	│       ├── employment.ts
	│       ├── rent.ts
	│       ├── utility.ts
	│       └── factors.test.ts
	├── validation/
	│   ├── schemas.ts         # Zod schemas (per step + composite)
	│   └── schemas.test.ts    # Validation unit tests
	├── utils/
	│   └── userDataFactory.ts # Factory for initial/empty state
	├── contexts/
	│   └── ThemeContext.tsx   # Theme toggle context
	├── types/
	│   ├── index.ts           # Shared domain types
	│   └── chat.ts            # (If retained; unused after auth removal)
	├── lib/                   # (removed legacy external service clients)
	└── constants/
		└── steps.ts           # Ordered definition of multi‑step flow
```
Notes:
- Directories/files marked (Legacy) are candidates for removal if no imports remain.
- Factor modules stay pure for testability & deterministic outputs.
- All form components rely on the central reducer hook + Zod schemas.

## 🚀 Quick Start
Requires Node >= 18 (matches engines & CI).

```bash
git clone https://github.com/srisaihariharan/code_kong.git
cd code_kong
npm install
npm run dev
# Open the printed local URL (default http://localhost:5173)
```

### Production Build / Preview
```bash
npm run build
npm run preview   # Serve dist/ locally
```

## ✅ Scripts Overview
| Script       | Purpose                                  |
|--------------|-------------------------------------------|
| dev          | Start Vite dev server                     |
| build        | Create production bundle in dist/         |
| preview      | Serve built bundle                        |
| lint         | Run ESLint over the project               |
| typecheck    | TypeScript type checking only             |
| test         | Run Vitest test suite once                |
| test:watch   | Watch mode tests                          |
| coverage     | Tests with coverage report                |

## 🧪 Testing
Vitest + jsdom. Coverage currently targets: scoring logic, factor calculators, validation schemas.

Run tests:
```bash
npm test
```
With coverage:
```bash
npm run coverage
```

## ♿ Accessibility
- Skip navigation link for keyboard / screen reader users
- Focus automatically moved to step container on navigation
- aria-live region announces step changes & final score
- Disabled submit buttons until validation passes to prevent premature submission

Planned: consolidated error summary & enhanced ARIA descriptions for grouped numeric fields.

## 🛡️ Data Integrity & Persistence
State persisted in localStorage under a versioned key; hydration validates via composite schema to avoid stale / corrupted shapes. Invalid payloads are discarded safely.

## 🔄 CI Pipeline
GitHub Actions workflow runs: lint → typecheck → test → build on pushes / PRs to main ensuring consistent quality gates.

## 🧭 Roadmap (Short)
- Expand test coverage (hook persistence, accessibility behaviors)
- Enforce coverage thresholds in CI
- Factor attribution UI (visual per‑factor contribution)
- Export / import application snapshots
- Accessibility: error summary + consistent aria-describedby mapping

## 👥 Team
- Prodhosh V.S
- Gowreesh V T
- Sri Sai Hariharan
- Kailash R

## 📷 Screenshots
<details>
<summary>Expand gallery</summary>

![Personal Information](Personal%20Information%20Screenshot.jpeg)
![Banking Information](Banking%20Information%20Screenshot.jpeg)
![Employment History](Employment%20History%20Screenshot.jpeg)
![Rent Payment History](Rent%20Payment%20History%20Screenshot.jpg)
![Utility Payment History](Utility%20Payment%20History%20Screenshot.jpeg)
![Education History](Education%20History%20Screenshot.jpeg)
![Score Breakdown](Score%20Breakdown%20Screenshot.jpeg)
![Financial Coaching Feature](Financial%20Coaching%20Feature%20Screenshot.jpeg)

</details>

## 🤝 Contributing
Issues & pull requests welcome. Please:
1. Fork & create a feature branch (feat/your-feature)
2. Make changes with tests where reasonable
3. Run `npm run lint && npm run typecheck && npm test`
4. Open PR describing rationale & screenshots (if UI)

### 📬 Contact
-[Linkedin: Prodhosh ](https://www.linkedin.com/in/prodhoshvs/)
-[Linkedin: Sri sai ](https://www.linkedin.com/in/srisai-hariharan-s-03979736a/)
-[Linkedin: Gowreesh](https://www.linkedin.com/in/gowreesh/)
-[Linkedin: Kailash](https://www.linkedin.com/in/helloooo/)

## 📄 License
MIT © CodeKong Contributors. See [LICENSE](LICENSE).

---
This is a demo; for real data usage add encryption, PII minimization & regulatory compliance layers.




