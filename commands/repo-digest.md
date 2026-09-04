---
description: Perform a whole-codebase architectural digest and audit using Gemini's 1M-2M token context window. Detects circular dependencies, dead code, and layer boundaries.
argument-hint: [--full | --dependencies | --orphans]
---

# Repo Digest Command

The `/repo-digest` command unleashes Gemini's ultra-long context window to digest and analyze your entire repository simultaneously.

## Usage

```bash
/repo-digest                # Comprehensive whole-repo architectural audit
/repo-digest --dependencies # Map full cross-module dependency graph and circular imports
/repo-digest --orphans      # Find all dead code, unused models, and unreferenced routes
```

## Output

1. **System Topology Map**: Architectural layout of packages, services, and boundaries.
2. **Circular Dependency Alerts**: Concrete cycles with file paths and line numbers.
3. **Dead Code Inventory**: Safe-to-delete files and functions with zero active references.
4. **Actionable Roadmap**: Step-by-step guidance for refactoring and codebase cleanup.
