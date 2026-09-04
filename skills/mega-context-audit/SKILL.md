---
name: mega-context-audit
description: Ingest and analyze entire codebases simultaneously using Gemini's 1M-2M token context window. Audits global dependency graphs, architectural boundaries, cross-module refactors, and dead code with zero blind spots.
metadata:
  origin: EGC
---

# Mega-Context Repository Audit

This skill capitalizes on Gemini's ultra-long context window (up to 2 Million tokens) to perform holistic, repository-wide architectural analyses without the blind spots caused by context compaction or localized chunking.

## When to Use

- When inheriting a legacy codebase or large monorepo with unclear architecture.
- Performing cross-module dependency auditing to identify circular imports.
- Discovering orphaned files, dead endpoints, or unused data models across the entire repository.
- Planning major architectural migrations (e.g., framework upgrades, database layer overhauls).

## How It Works

### Step 1: Repository Ingestion & Topology Mapping
Scan and collect file trees, package manifests, and module entrypoints:
```bash
# Extract repository file topology
find . -not -path '*/.*' -not -path '*/node_modules*' -not -path '*/dist*' -type f
```

### Step 2: Full-Graph Dependency Tracing
Trace all imports, export boundaries, and dynamic invocations across the system to construct a complete directed acyclic graph (DAG) of the codebase:
- Client / Presentation layer
- Domain / Business logic services
- Data access / Persistence entities
- External API connectors

### Step 3: Drift & Boundary Inspection
Analyze the topology for common architectural antipatterns:
1. **Circular References**: Module A imports B, B imports C, C imports A.
2. **Layer Inversion**: Presentation components querying databases directly without service abstraction.
3. **Dead Code Islands**: Exported classes or utilities with zero active callers in the workspace.

### Step 4: Architectural Report Delivery
Generate a structured report outlining:
- **System Architecture Diagram**: High-level Mermaid diagram of modules and data flow.
- **Topological Bottlenecks**: High-fan-in/high-fan-out modules that represent single points of failure.
- **Actionable Cleanup List**: Prioritized list of orphaned files and boundary fixes.
