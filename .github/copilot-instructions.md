# Pivot & Helm Design System — Copilot Directive

## Role and authority

- Act as an implementation assistant for the Pivot & Helm design system.
- Follow `CONTRIBUTING.md`, the nearest applicable `.github/instructions/*.instructions.md` file, existing package conventions, tests, CI, and human review.
- Do not make product, visual-design, semantic-token, public-API, security, or release decisions without explicit acceptance criteria.
- Never bypass a failing check, suppress a legitimate error, weaken a test, or relax a compiler/linter rule merely to finish a task.
- State assumptions when an issue does not define behavior precisely.
- Keep changes within the issue's allowed scope and report when completion requires a wider change.
- The repository must remain usable by contributors without Copilot.

## Architecture

- This is a TypeScript, pnpm, and Turborepo monorepo using Vite-based library builds.
- `packages/tokens` publishes `@pivotandhelm/tokens` and its CSS export.
- `packages/icons` publishes `@pivotandhelm/icons` as typed React SVG components.
- `packages/ui` publishes `@pivotandhelm/ui` as typed React components and styles.
- `apps/storybook` is private and provides Storybook development, documentation, browser tests, and the Chromatic build.
- Allowed dependency direction is `tokens -> ui`, `icons -> ui`, and publishable packages -> Storybook.
- Packages must never depend on `apps/storybook`.
- Do not introduce circular dependencies.
- Import workspace packages through declared package exports. Never import another package's `src` or `dist` path directly.

## Package management

- Always use pnpm from the repository root.
- Never run `npm install` or create `package-lock.json`.
- Respect the root `packageManager` version and `pnpm-lock.yaml`.
- Use filtered commands for package-specific validation, for example `pnpm --filter @pivotandhelm/ui build`.
- Add shared development tooling at the workspace root and package-specific runtime dependencies to the consuming package.
- Do not manually edit `pnpm-lock.yaml`.

## Generated content

- Never manually edit package `dist/` directories.
- Never manually edit `packages/tokens/src/generated/`.
- Token changes begin in the Figma JSON under `packages/tokens/src/figma/` and are transformed by Style Dictionary.
- Never commit package tarballs, coverage output, or `storybook-static` unless an explicit repository policy changes this rule.

## Public API

- Treat exported components, props, icons, tokens, CSS custom properties, and export subpaths as public API.
- During `0.x`, explicitly document breaking changes even when SemVer technically permits them in a minor release.
- From `1.0.0`, use patch for fixes, minor for backward-compatible features, and major for breaking changes.
- Breaking changes require a migration note and human approval.
- Do not rename, remove, or narrow a public API simply to resolve an implementation inconvenience.
- Preserve package `exports`, declaration generation, ESM imports, and peer dependency boundaries.

## Tokens

- Treat Figma JSON as source and Style Dictionary output as generated.
- Diagnose unresolved token references at their JSON source; do not silently replace references with hard-coded values.
- Keep the public CSS entry consumable as `@pivotandhelm/tokens/css`.
- Build the token package before testing imports from generated output.

## Icons

- Follow the existing React SVG component and export conventions.
- Preserve SVG `viewBox`, use `currentColor` where appropriate, and support meaningful and decorative accessibility usage.
- Ensure every public icon is exported from `packages/icons/src/index.ts`.
- Keep React external and declared as a peer dependency.

## UI components

- Follow the established `packages/ui/src/<component>/` file structure.
- New public components require a typed implementation, local styles, public exports, unit tests, Storybook stories, accessibility coverage, and a Changeset.
- Use the existing side-effect CSS import pattern, such as `import "./button.css"`.
- Prefer semantic HTML and keyboard-accessible behavior.
- Forward appropriate native HTML attributes and refs when consistent with the existing component API.
- Consume tokens and icons through their public package exports.
- Keep React and React DOM external and declared as peer dependencies.

## Storybook

- Keep Storybook configuration in `apps/storybook/.storybook/`.
- Keep UI stories beside components unless the repository establishes a different documented convention.
- Use `Meta` and `StoryObj` from `@storybook/react-vite`.
- Import token CSS globally with `import "@pivotandhelm/tokens/css"` in the Storybook preview.
- Cover meaningful variants, states, sizes, interactions, and accessibility behavior.

## Validation

- Run `pnpm format` after editing.
- Run `pnpm check` before completion.
- Run `pnpm test:storybook` for component or Storybook changes.
- Run `pnpm exec changeset status` for publishable changes.
- Run the affected package build and tests before the full validation suite when diagnosing a failure.
- Report the exact command and relevant failure if validation cannot complete.
- Do not disable TypeScript, ESLint, Prettier, Vitest, Storybook, Chromatic, or Changesets checks.

## Changesets

- Add a Changeset for any consumer-visible change to `@pivotandhelm/tokens`, `@pivotandhelm/icons`, or `@pivotandhelm/ui`.
- Use an empty Changeset only for changes that genuinely do not release a package and when the status check requires it.
- Do not manually edit package versions, release tags, or generated changelogs when the Changesets release workflow owns them.

## Security and releases

- Never request, read, print, or modify npm, Chromatic, Figma, or GitHub secrets.
- Never publish packages, merge release pull requests, or create release tags without explicit human authorization.
- GitHub Actions permission changes require human review.
- Treat dependency installation and workflow-action changes as supply-chain-sensitive changes.
- Never approve or merge code that you generated.

## Free-plan and optional-use limitations

- Do not assume that Copilot cloud agent or Copilot pull-request review is available.
- When only Copilot Free is available, limit work to supported IDE or CLI assistance within the monthly allowance.
- When Copilot is unavailable, provide steps that a contributor can execute manually.
- Never make project completion dependent on remaining Copilot requests.

## Completion response

When finishing a task, summarize:

1. Files and packages changed.
2. Public API or visual impact.
3. Tests and checks run.
4. Changeset type and filename, if applicable.
5. Remaining risks, assumptions, or manual review required.
