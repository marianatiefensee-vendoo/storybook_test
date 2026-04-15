# Design system / Storybook working rules

## Source of truth
- Figma is the visual source of truth.
- Always use the full exact Figma node URL.
- For reusable DS components, prefer the design-system library family node.
- For screen mocks, use screen nodes only for composition context.
- Do not trust unstable nested child IDs from instance payloads as authoritative structure.

## Implementation rules
- Reuse existing Storybook and DS primitives before creating new ones.
- Use Go Flow design system visuals/UI unless explicitly told otherwise.
- Keep runtime APIs semantic.
- Keep styling token-backed and aligned with the repo.
- Plan first, then implement.

## Parity rules
- For parity work, screenshot is primary visual truth.
- If live Figma MCP payload cannot be retrieved, do not claim exact parity.
- Label approximation clearly when needed.

## Storybook MCP rules
- When working on UI components, always use the `storybook-claude-mcp-server` MCP tools before answering, generating code, or editing stories.
- Never hallucinate component props.
- Before using any property on a design-system component, first check Storybook documentation for that exact component.
- First list available documentation/components.
- Then fetch documentation for the specific component.
- Only use props that are explicitly documented or shown in stories/examples.
- If a prop is not documented, do not guess based on naming conventions or other libraries.
- Fetch the latest story instructions before creating or updating stories.
- Run story tests before considering the task complete.
- If Storybook docs and repo code disagree, surface the mismatch instead of inventing a solution.

## Storybook rules
- Build reusable primitives first.
- Build pattern/mock compositions separately from public DS primitives.
- Generic stories and parity stories are different things.
- Add args-based Playground stories.
- Use composed stories for realistic shell/page examples.
- Keep stories focused: one story should demonstrate one concept clearly.
- Avoid kitchen-sink stories when separate focused stories would be clearer.