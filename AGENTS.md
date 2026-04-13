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

## Validation
- Run relevant tests or checks if they exist.
- Keep Storybook stories usable for visual QA.
