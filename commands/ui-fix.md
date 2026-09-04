---
description: Inspect a UI screenshot or design mockup and automatically diagnose and fix frontend layout, styling, or component bugs.
argument-hint: <path/to/screenshot.png or description of visual issue>
---

# UI Fix Command

The `/ui-fix` command triggers Gemini's multimodal visual inspection workflow to diagnose and resolve visual bugs, alignment issues, and UI discrepancies between designs and code.

## Usage

```bash
/ui-fix path/to/bug-screenshot.png
/ui-fix "The navigation bar overflows on mobile viewports"
```

## Workflow

1. **Ingest Visual Evidence**:
   - Inspect the provided image or UI reproduction steps.
   - Detect misaligned elements, broken padding/margins, overflow clipping, or contrast failures.
2. **Locate Target Files**:
   - Trace rendered HTML/JSX back to specific component files and stylesheets.
3. **Execute Atomic Fix**:
   - Apply clean CSS / Tailwind / layout corrections.
   - Preserve component contracts and responsive behavior across all viewports.
4. **Report Changes**:
   - Summarize the root cause (e.g. missing `flex-wrap`, incorrect `z-index`, non-responsive width constraint).
   - Display a clean diff of updated styling classes.
