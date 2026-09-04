# Everything Gemini Code (EGC) 🚀

> **The Agent Harness Performance Optimization System for Gemini CLI & Antigravity**  
> Built and maintained by [@stephenpaul2509c-ship-it](https://github.com/stephenpaul2509c-ship-it).

Everything Gemini Code (EGC) is a production-grade, multi-agent harness engineering framework specifically ported and optimized for **Gemini CLI** and the **Google Antigravity IDE / CLI**.

It equips your Gemini coding assistant with **72 specialized agents**, **288 context-aware skills**, **96 workflow commands**, unified directory rules, and ready-to-use Model Context Protocol (MCP) integrations.

---

## 🚀 Gemini-Exclusive Superpowers

Unlike text-only coding harnesses, Everything Gemini Code (EGC) is built from the ground up to exploit Google Gemini's distinct hardware and model advantages:

1. 👁️ **Multimodal Visual UI Debugging (`/ui-fix`)**:
   Feed Gemini a screenshot of a visual bug, broken responsive layout, or Figma design. The `visual-ui-engineer` agent compares pixels against source code and applies exact CSS/Tailwind/Flutter fixes.
2. 🧠 **2-Million Token Mega-Context Repo Digest (`/repo-digest`)**:
   Never lose context due to aggressive compaction. Ingest entire multi-thousand-file repositories simultaneously with `mega-context-architect` to detect circular dependencies, orphaned models, and architectural drift.
3. ☁️ **Cloud-Native Deployers**:
   Includes specialized subagents for **Firebase** (`firebase-architect`) and **Google Cloud Run** (`gcp-cloud-deployer`) with automated OCI containerization and security rule audits.
4. 🤖 **Official GitHub Action Automated PR Reviewer**:
   Deploy EGC straight into CI/CD with `uses: stephenpaul2509c-ship-it/everything-gemini-code@main` to automatically audit PR diffs with confidence scoring.

---

## 🌟 What's Included

| Component | Count | Description |
| :--- | :--- | :--- |
| **Specialized Agents** | **72** | Modular sub-assistants for architecture, TDD, code review, multimodal UI, Firebase, Cloud Run, and security. |
| **Contextual Skills** | **288** | Progressive-disclosure operational runbooks spanning vision debugging, full-stack frameworks, cloud infrastructure, AI/ML, and testing. |
| **Workflow Commands** | **96** | Interactive slash commands and prompts for fast review, whole-repo digest (`/repo-digest`), visual fixes (`/ui-fix`), and checkpoints. |
| **Domain Rules** | **23+** | Structured coding guidelines and standards for Python, TypeScript, React, Go, Rust, C++, Swift, Security, and more. |
| **MCP Connectors** | **15+** | Pre-configured Model Context Protocol servers for GitHub, Supabase, Jira, Memory, Vercel, and Cloudflare. |

---

## 📦 Installation

### Option 1: As an Antigravity Plugin (Recommended)

#### A. Workspace / Project-Level:
Place or clone this repository into `.agents/plugins/everything-gemini-code` in your project root:
```bash
git clone https://github.com/stephenpaul2509c-ship-it/everything-gemini-code.git .agents/plugins/everything-gemini-code
```

#### B. Machine-Wide Global Plugin:
Clone into your global Gemini config directory:
```bash
git clone https://github.com/stephenpaul2509c-ship-it/everything-gemini-code.git ~/.gemini/config/plugins/everything-gemini-code
```

Antigravity will automatically detect `plugin.json`, load all 286 skills progressively, register rules, and expose MCP servers.

---

### Option 2: As a Gemini CLI Extension

Install directly via the Gemini CLI:
```bash
gemini extensions install https://github.com/stephenpaul2509c-ship-it/everything-gemini-code
```
Or copy `gemini-extension.json` and assets into your active Gemini CLI workspace.

---

## 🛠 Directory Structure

```text
everything-gemini-code/
├── plugin.json                 # Antigravity Plugin Manifest
├── gemini-extension.json       # Gemini CLI Extension Manifest
├── mcp_config.json             # MCP Servers configuration (Stdio & SSE)
├── hooks.json                  # Lifecycle safety & quality hooks
├── GEMINI.md                   # Core workspace rules & coding standards
├── AGENTS.md                   # Agent guidelines & prompt defense baseline
├── README.md                   # Project documentation & reference
├── LICENSE                     # MIT License
├── rules/                      # Language and domain specific guidelines
│   ├── AGENTS.md               # Unified global agent rules
│   ├── common/                 # Common testing, security, git workflows
│   ├── python/                 # Python coding style, FastAPI, testing
│   ├── typescript/             # TypeScript best practices & patterns
│   └── ...
├── skills/                     # 286 progressive-disclosure skills
│   └── <skill-name>/SKILL.md
├── agents/                     # 68 persona and subagent definitions
│   └── <agent-name>.md
└── commands/                   # 94 slash commands & workflow prompts
    └── <command-name>.md
```

---

## 💡 How to Use

### 1. Skills (Progressive Disclosure)
Skills are loaded on demand so your Gemini context window never gets overwhelmed. Gemini discovers skills by their metadata and activates them when relevant:
- Run a security audit: triggers `agent-architecture-audit` and `security-review`.
- Test-driven development: triggers `tdd` and `test-generator`.

### 2. Specialized Agents
Invoke domain-specific subagents during pair programming:
- **`code-reviewer`**: Rigorous multi-pass code reviews.
- **`build-error-resolver`**: Pinpoints and resolves compilation/build failures.
- **`architect`**: Systems design and high-level architectural planning.
- **`security-auditor`**: OWASP and enterprise security posture validation.

### 3. Workflow Commands
Run guided workflow commands by typing:
- `/code-review` - Automated code quality and style inspection.
- `/checkpoint` - Create a clean git checkpoint and work status.
- `/build-fix` - Diagnose and repair project build errors.
- `/aside` - Ask side questions without losing context.

---

## 🧪 Validation & Test Suite Results

Every component of Everything Gemini Code is tested and validated against the official Gemini CLI and Antigravity specifications.

Run the test suite locally at any time:
```bash
python scripts/verify-plugin.py
```

### Automated Test Suite Output:
```text
=====================================================
 Everything Gemini Code (EGC) - Plugin Test Suite
=====================================================
 [PASS] Antigravity Manifest (plugin.json)
 [PASS] Gemini CLI Manifest (gemini-extension.json)
 [PASS] MCP Server Catalog (29 servers configured)
 [PASS] Lifecycle Hooks (23 named hooks configured)
 [PASS] Contextual Skills (288/288 skills valid - 100%)
 [PASS] Specialized Subagents (72/72 agents valid - 100%)
=====================================================
 TEST SUMMARY: 6 passed, 0 failed
 Status: ALL CHECKS PASSED [OK]
=====================================================
```

---

## ⚡ Performance: Vanilla Gemini vs. Gemini + EGC

| Capability | Vanilla Gemini (Base) | Gemini with Everything Gemini Code (EGC) |
| :--- | :--- | :--- |
| **Code Review** | Generic review; comments on subjective style preferences and adds noise. | **`code-reviewer` agent**: Strict 4-stage confidence gate (>80% certainty required), exact file & line citations, concrete failure modes, and zero noise. |
| **Development Workflow** | Immediately writes code, often without tests or validation. | **`tdd-workflow` skill**: Enforces Red-Green-Refactor cycle with 80%+ unit, integration, and E2E test coverage before shipping. |
| **Context Window Efficiency** | Large monolithic prompts bloat the context window. | **Progressive Disclosure**: Only skill names & descriptions load initially (~200 tokens). Full operational runbooks load *only when triggered*. |
| **Safety & Security Gates** | Blind execution of bash scripts and file edits. | **GateGuard Lifecycle Hooks**: Intercepts pre/post tool use to block secret leakage, prevent accidental data destruction, and verify MCP health. |
| **Specialized Delegation** | Single general-purpose model handles all tasks. | **68 Delegated Subagents**: Tasks are routed to specialized personas (e.g. `architect`, `build-error-resolver`, `security-auditor`). |
| **Multi-Language Standards** | Generic syntax suggestions. | **23+ Curated Rulebooks**: Dedicated best-practice guides for Python (FastAPI), TypeScript, React, Go, Rust, C++, Swift, etc. |

---

## 🤝 License & Attribution

Attribution: Everything Gemini Code (EGC) is adapted from Everything Claude Code (ECC) by Affaan Mustafa. ECC is licensed under the MIT License.

Built for the Google Gemini and Antigravity ecosystem. Licensed under the [MIT License](./LICENSE).

