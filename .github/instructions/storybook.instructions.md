---
applyTo: "apps/storybook/**/*,packages/ui/src/**/*.stories.tsx,packages/icons/src/**/*.stories.tsx"
---

# Storybook instructions

## Scope and purpose

- These instructions apply to the private Storybook application and component story files.
- `apps/storybook` documents and validates the public design-system packages; it is not published to npm.
- Storybook uses the React Vite framework.

## Configuration

- Keep Storybook configuration under `apps/storybook/.storybook/`.
- Preserve the configured story globs so stories in workspace packages are discovered.
- Use `@storybook/react-vite` for framework-specific configuration and story types.
- Import global token CSS in `apps/storybook/.storybook/preview.ts` through `import "@pivotandhelm/tokens/css"`.
- Do not import `packages/tokens/dist` or any other package's internal output path.
- Keep addons compatible with the installed Storybook major version; do not mix addon packages from a different major.

## Story authoring

- Use `Meta` and `StoryObj` from `@storybook/react-vite`.
- Prefer typed metadata using `satisfies Meta<typeof Component>`.
- Keep component stories beside their component when that is the established package convention.
- Provide a concise title that follows the existing hierarchy.
- Use args and controls for consumer-relevant props.
- Cover default, variants, sizes, disabled/loading/error states, and meaningful compositions where applicable.
- Add `play` interactions for important user flows and assertions.
- Keep story data deterministic; do not depend on current time, random values, network calls, or secrets.

## Accessibility and visual review

- Ensure every interactive story is operable with the keyboard.
- Provide accessible labels for controls and icon-only actions.
- Do not suppress accessibility findings without documenting the reason and receiving human approval.
- Keep Chromatic snapshots focused and stable; avoid animation or nondeterminism unless the story explicitly tests it.
- A human must approve intentional visual changes in Chromatic.

## Public package usage

- Prefer importing components, icons, and tokens from their public package exports.
- A colocated UI story may import its component relatively when required for package-local development, but it must not import another workspace's `src` or `dist` directory.
- Do not turn `apps/storybook` into a source of reusable production components.

## Validation

Run from the monorepo root:

- `pnpm build:storybook`
- `pnpm test:storybook`
- `pnpm typecheck`
- `pnpm check`

If browser tests fail, verify the Playwright Chromium installation before changing test configuration:

- `pnpm exec playwright install --with-deps chromium`

Do not remove the Storybook Vitest plugin, browser project, or Playwright provider merely to bypass an environment or dependency error.

## Versioning

- Changes confined to the private Storybook application normally do not release a package.
- Add an empty Changeset only when the repository's Changeset status check requires one.
- If a story accompanies a published component change, the component package's Changeset describes the consumer-visible change.
