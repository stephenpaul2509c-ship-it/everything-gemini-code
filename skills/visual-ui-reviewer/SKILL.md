---
name: visual-ui-reviewer
description: Inspect and debug user interfaces using Gemini's native multimodal vision. Compares screenshots against source code, translates UI designs to Tailwind/React/Flutter, and audits visual regressions.
metadata:
  origin: EGC
---

# Visual UI Reviewer & Multimodal Debugger

This skill leverages Gemini's native multimodal vision to analyze visual interfaces, design mockups, and bug screenshots, mapping visual elements directly into source code changes.

## When to Use

- When the user shares a screenshot or image of a visual bug, misaligned element, or layout error.
- When translating a Figma screenshot or wireframe into production code.
- Auditing UI components for visual fidelity against design system specifications.
- Checking contrast, spacing scales, and responsive breakpoint reflow.

## How It Works

### Step 1: Visual Deconstruction
Deconstruct the image into structural layers:
- **Layout Architecture**: Flex row/column, CSS Grid, absolute positioning.
- **Spacing Scale**: Micro-spacing (gap-1, gap-2) vs container padding (p-4, p-6, p-8).
- **Typography Hierarchy**: Font family, font size, line-height, letter-spacing, font-weight.
- **Color & Elevation**: Background colors, border strokes, box-shadows, and border-radius.

### Step 2: Source Code Mapping
Identify which component or template renders the target UI:
- Check route definitions and page layouts.
- Search for identifiable text strings, CSS classes, or icon names.

### Step 3: Implement Pixel-Perfect Fix
Apply updates using standard utility classes or modular CSS:
```tsx
// Before: Misaligned badge & missing focus ring
<div className="flex gap-2">
  <span className="text-xs bg-gray-200">{status}</span>
  <button className="bg-blue-600 text-white">Action</button>
</div>

// After: Aligned with proper vertical centering, padding, and accessibility
<div className="flex items-center gap-3">
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
    {status}
  </span>
  <button className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors">
    Action
  </button>
</div>
```

### Step 4: Verification Checklist
- [ ] Contrast ratio meets WCAG 2.2 Level AA (4.5:1 for normal text).
- [ ] Touch targets are at least 44x44 CSS pixels on touch viewports.
- [ ] No layout shift or horizontal scrollbars at 375px width.
