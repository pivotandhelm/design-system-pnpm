---
applyTo: "packages/ui/**/*"
---

# UI package instructions

## Scope and purpose

- These instructions apply to `@pivotandhelm/ui` in `packages/ui`.
- The package publishes reusable, typed, accessible React components and their CSS.
- Components may consume `@pivotandhelm/tokens` and `@pivotandhelm/icons` only through public package exports.

## Component structure

- Follow the existing lowercase component-directory convention demonstrated by `packages/ui/src/button/`.
- A new component should normally contain:
  - `Component.tsx`
  - `component.css`
  - `Component.test.tsx`
  - `Component.stories.tsx`
- Match existing filename casing if the component pattern in the repository differs.
- Export every public component and public prop type through `packages/ui/src/index.ts`.

## React and TypeScript

- Use explicit public prop types and extend the appropriate native HTML attribute type when applicable.
- Prefer semantic HTML elements over generic elements with simulated behavior.
- Forward supported native attributes and refs when this matches existing component conventions.
- Keep React and React DOM external to the Vite library build and declared as peer dependencies.
- Do not use `any`, `@ts-ignore`, non-null assertions, or unsafe casts to hide an unresolved design or typing problem.
- Do not add `.tsx` to relative import specifiers unless the relevant tsconfig explicitly enables importing TypeScript extensions.

## Styling and tokens

- Keep component CSS beside the component.
- Use the established side-effect import pattern, for example `import "./button.css"` in `Button.tsx`.
- Consume design values through `@pivotandhelm/tokens` public exports or CSS custom properties.
- Do not import token source JSON, `packages/tokens/src`, or package `dist` paths.
- Preserve consumer style override capabilities; avoid unnecessary `!important` declarations and overly specific selectors.
- Use stable Pivot & Helm class naming consistent with existing components.

## Accessibility

- Provide an accessible name for interactive controls.
- Preserve keyboard operation, focus visibility, disabled behavior, and appropriate roles/states.
- Prefer native `button`, `a`, `input`, and other semantic elements before adding ARIA roles.
- Do not use ARIA to contradict native semantics.
- Add tests for behavior that is essential to accessible use.

## Tests and stories

- Use Vitest and the repository's React testing utilities.
- Test observable behavior: rendering, roles/names, variants, events, disabled behavior, and native attribute forwarding.
- Do not test private implementation details or rely on broad snapshots as the only coverage.
- Add Storybook stories using `Meta` and `StoryObj` from `@storybook/react-vite`.
- Include default, meaningful variants, sizes, disabled/error states, and interaction cases when applicable.
- Keep stories deterministic so Chromatic comparisons remain useful.

## Package boundaries

- Do not import another workspace package through relative filesystem paths.
- Do not introduce a dependency from tokens or icons back to UI.
- Do not put application-specific business logic in the UI package.
- Do not export experimental APIs unless the issue and Changeset label them clearly.

## Validation

Run from the monorepo root:

- `pnpm --filter @pivotandhelm/ui build`
- `pnpm --filter @pivotandhelm/ui test`
- `pnpm typecheck`
- `pnpm build:storybook`
- `pnpm test:storybook`
- `pnpm exec changeset status`

For a repository-wide check, also run `pnpm format` and `pnpm check`.

## Versioning

- Add a minor Changeset for a new backward-compatible component, variant, or prop.
- Add a patch Changeset for a backward-compatible behavioral, styling, typing, or accessibility fix.
- Treat removed exports, renamed props, changed defaults with consumer impact, or incompatible behavior as breaking.
- Breaking changes require human approval and migration guidance.