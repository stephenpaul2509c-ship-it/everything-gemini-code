# Everything Gemini Code (EGC) 🚀

> **The Agent Harness Performance Optimization System for Gemini CLI & Antigravity**  
> Adapted from [affaan-m/ECC](https://github.com/affaan-m/ECC) (Everything Gemini CLI / Antigravity) for Google Gemini.

Everything Gemini Code (EGC) is a production-grade, multi-agent harness engineering framework specifically ported and optimized for **Gemini CLI** and the **Google Antigravity IDE / CLI**.

It equips your Gemini coding assistant with **68 specialized agents**, **286 context-aware skills**, **94 workflow commands**, unified directory rules, and ready-to-use Model Context Protocol (MCP) integrations.

---

## 🌟 What's Included

| Component | Count | Description |
| :--- | :--- | :--- |
| **Specialized Agents** | **68** | Modular sub-assistants for architecture, TDD, code review, debugging, security, refactoring, and domain workflows. |
| **Contextual Skills** | **286** | Progressive-disclosure operational runbooks spanning accessibility, full-stack frameworks, cloud infrastructure, AI/ML, and testing. |
| **Workflow Commands** | **94** | Interactive slash commands and prompts for fast review, auto-formatting, test generation, and checkpoints. |
| **Domain Rules** | **23+** | Structured coding guidelines and standards for Python, TypeScript, React, Go, Rust, C++, Swift, Security, and more. |
| **MCP Connectors** | **15+** | Pre-configured Model Context Protocol servers for GitHub, Supabase, Jira, Memory, Vercel, and Cloudflare. |

---

## 📦 Installation

### Option 1: As an Antigravity Plugin (Recommended)

#### A. Workspace / Project-Level:
Place or clone this repository into `.agents/plugins/everything-gemini-code` in your project root:
```bash
git clone https://github.com/<your-username>/everything-gemini-code.git .agents/plugins/everything-gemini-code
```

#### B. Machine-Wide Global Plugin:
Clone into your global Gemini config directory:
```bash
git clone https://github.com/<your-username>/everything-gemini-code.git ~/.gemini/config/plugins/everything-gemini-code
```

Antigravity will automatically detect `plugin.json`, load all 286 skills progressively, register rules, and expose MCP servers.

---

### Option 2: As a Gemini CLI Extension

Install directly via the Gemini CLI:
```bash
gemini extensions install https://github.com/<your-username>/everything-gemini-code
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

## 🤝 Attribution & Acknowledgements

This project is a direct adaptation of [affaan-m/ECC](https://github.com/affaan-m/ECC) created by **Affaan Mustafa**. All credit for the original design, skills, and agent harness architecture belongs to the upstream author and contributors.

Licensed under the [MIT License](./LICENSE).
