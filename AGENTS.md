# Design System / Storybook repo instructions

## Goal
This repo is a design-system and Storybook workspace.
Prioritize reusable, pixel-accurate, token-backed components and stories.

## General workflow
- Build small component families first.
- Do not jump to full screens or layout patterns unless explicitly asked.
- Reuse existing Storybook components before creating new ones.
- Prefer planning first, implementation second.

## Storybook rules
- Every new component must have an args-based Playground story.
- Add state/variant stories when the component has meaningful visual or behavioral differences.
- Use semantic runtime APIs, not literal Figma state labels.
- Keep hover, pressed, and focus as stories or interaction demos, not public props unless truly needed.
- For complex values like icons, slots, or nested content, use story-only primitive args and map them in `render`.
- Keep docs/source focused on the real component API.

## Styling rules
- Use existing design tokens and repo conventions whenever available.
- Do not introduce hardcoded spacing, radius, colors, typography, or shadows if token equivalents already exist.
- Convert Figma output into the repo's real tech stack and styling system.
- Build production-oriented components, not one-off mocks.

## Reuse rules
Before creating a component, always check whether an equivalent already exists for:
- Button
- IconButton
- Divider
- Chip / Tag
- Input
- Dropdown / Select
- NavigationRail
- AppBar
- Icons

## Output expectations
For each task:
1. identify reuse vs new build
2. propose API
3. list states and variants
4. implement component
5. implement stories
6. summarize assumptions

## Parity story rule
When working on screen mocks, layout mocks, or example implementations based on a specific Figma node:
- treat the task as a parity task unless explicitly told otherwise
- inspect the exact node first
- audit the current Storybook output against that node before coding
- list visual deltas explicitly
- fix composition/story issues before changing reusable primitives
- do not invent badges, labels, states, or layout changes not visible in the node
- keep generic playground stories separate from Figma parity stories

## Validation
- Run relevant tests or checks if they exist.
- Keep Storybook stories usable for visual QA.

## Parity and interaction-shell rules

When implementing or fixing a component against a specific Figma node:

- Treat the task as a parity task unless explicitly told otherwise
- Audit the current implementation against the exact node before coding
- Do not approximate locked brand assets like logos; preserve the exact asset, aspect ratio, scale, and placement from the node
- The visual interaction state layer must match the interactive hit area
- Do not apply selected / hovered / focus state backgrounds only to inner content wrappers if the full item shell is intended to be interactive
- The element that owns padding, width, radius, and click behavior should usually also own the state background
- Fix story/composition-level issues first, then primitive issues if necessary
- Do not invent badges, spacing, or alternate states not visible in the target node

## Figma source-of-truth rules

When implementing, fixing, or planning any design-system or Storybook component:

- Figma is the visual source of truth.
- Always use the exact Figma node URL provided in the task.
- Do not rely on a broad parent frame when a specific node URL is available.
- Inspect the exact node first before proposing API or code changes.
- Use the Figma MCP tools / Figma skills first to understand:
  - structure
  - spacing
  - sizing
  - states
  - variants
  - assets
  - content hierarchy
- Use the Vendoo design-system skills/rules as the implementation guardrails so the output stays aligned with the repo’s design system and existing tokens/components.
- Reconcile Figma truth with repo truth in this order:
  1. exact Figma node
  2. existing Vendoo design-system rules and tokens
  3. existing reusable components in the repo
  4. only then create new components if needed

## Node handling rules

- Always prefer the exact node URL over a page URL or large frame URL.
- If a task references a specific component or section, inspect only that subtree first.
- Do not implement from memory or from nearby nodes if the exact node was provided.
- If the current Storybook output differs from Figma, do a delta audit before coding.

## Required workflow for every implementation

1. Read the exact Figma node
2. Check for existing reusable repo components
3. Apply Vendoo design-system conventions and tokens
4. Propose reuse vs new build
5. List states and variants from the exact node
6. Implement with Storybook stories
7. For parity work, compare the Storybook output back to the exact Figma node

## Storybook + parity rules

- Generic DS stories and Figma parity stories are different things.
- If the task is based on a specific Figma node, treat it as a parity task unless explicitly told otherwise.
- Do not invent badges, labels, spacing, layout changes, or extra states not present in the target node.
- The interaction state layer must match the interactive hit area.
- Locked assets like logos must preserve the exact asset, aspect ratio, scale, and placement from Figma.

## Skill usage rules

- Always use the Figma skills / MCP context before implementation when a Figma node is provided.
- Always use Vendoo design-system rules/skills to keep styling, naming, and component architecture aligned with the repo.
- Do not bypass these sources of truth unless explicitly instructed.

## Exact Figma URL rule

- Always use the full exact Figma node URL provided in the task
- Do not rely on raw node numbers alone
- Use the Figma skills / MCP context from the full URL first
- Treat the exact full URL as the visual source of truth

## Figma MCP failure rule

When a task depends on an exact Figma node:
- If the live Figma MCP payload cannot be retrieved, do not claim exact parity
- Clearly label the result as an approximation if implementation continues
- Do not widen scope or infer hidden/expanded states from a single exact node
- Prefer stopping after diagnostics for parity-critical work unless explicitly told to proceed without MCP
