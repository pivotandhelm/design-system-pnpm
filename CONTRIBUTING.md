# Contributing to the Pivot & Helm Design System

Thank you for contributing to the Pivot & Helm React component library. This repository contains the design tokens, icons, React components, and Storybook documentation used to build consistent Pivot & Helm interfaces.

## Repository architecture

This is a pnpm monorepo orchestrated by Turborepo.

| Workspace         | Package                   | Purpose                                                                                                             | Published |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------- |
| `packages/tokens` | `@pivotandhelm/tokens`    | Figma token JSON, Style Dictionary configuration, generated JavaScript/TypeScript tokens, and CSS custom properties | Yes       |
| `packages/icons`  | `@pivotandhelm/icons`     | Typed React SVG icon components                                                                                     | Yes       |
| `packages/ui`     | `@pivotandhelm/ui`        | Typed React UI components and styles                                                                                | Yes       |
| `apps/storybook`  | `@pivotandhelm/storybook` | Local documentation, visual development, and interaction testing                                                    | No        |

Allowed dependency direction:

```text
tokens ───────► ui
icons ────────► ui
tokens/icons/ui ───────► apps/storybook
```

Packages must not depend on `apps/storybook`, and the monorepo must not contain circular dependencies.

## Prerequisites

- Node.js 24
- The pnpm version declared in the root `package.json` `packageManager` field
- Git
- Chromium installed through Playwright when running Storybook browser tests

Do not use npm or Yarn in this repository. Do not create `package-lock.json` or `yarn.lock`.

## Initial setup

Run all workspace commands from the repository root:

```bash
git clone <REPOSITORY_URL>
cd design-system-pnpm
pnpm install --frozen-lockfile
pnpm exec playwright install --with-deps chromium
pnpm check
pnpm test:storybook
```

Replace `<REPOSITORY_URL>` with the repository clone URL.

## Branch workflow

Create changes from an up-to-date `main` branch:

```bash
git switch main
git pull --ff-only origin main
git switch -c <type>/<short-description>
```

Recommended branch prefixes:

- `feat/` for backward-compatible functionality
- `fix/` for bug fixes
- `docs/` for documentation
- `refactor/` for behavior-preserving code changes
- `test/` for test-only changes
- `chore/` for tooling, maintenance, and workflows
- `release/` only for an explicitly managed release task

Never push feature work directly to `main`.

## Package-manager rules

- Use `pnpm` only.
- Run workspace commands from the repository root unless a package README explicitly says otherwise.
- Use `pnpm --filter <package-name> <script>` for package-specific work.
- Update dependencies with pnpm so `pnpm-lock.yaml` remains authoritative.
- Do not manually edit `pnpm-lock.yaml`.
- Do not install a dependency at the workspace root unless it is genuinely shared tooling.

Examples:

```bash
pnpm --filter @pivotandhelm/tokens build
pnpm --filter @pivotandhelm/icons build
pnpm --filter @pivotandhelm/ui build
```

## Generated and build output

The following are generated artifacts and must not be edited manually:

- Any package `dist/` directory
- `packages/tokens/src/generated/`
- `storybook-static/`
- Coverage output
- `*.tgz` package tarballs

Do not commit these files unless the repository's existing `.gitignore` and release policy explicitly require a particular artifact. Make source changes, run the relevant build, and inspect the regenerated output.

## Working on design tokens

Figma token JSON under `packages/tokens/src/figma/` is the token source of truth.

1. Update or replace the appropriate Figma JSON file.
2. Keep token references in the Style Dictionary form expected by the source data.
3. Build the token package:

   ```bash
   pnpm --filter @pivotandhelm/tokens build
   ```

4. Verify the public JavaScript/TypeScript token export.
5. Verify the public CSS export through `@pivotandhelm/tokens/css`.
6. Run the token tests.
7. Add a Changeset describing consumer-visible token changes.

Never fix an unresolved Style Dictionary reference by silently hard-coding a value. Find the missing or incorrectly named source token and correct the JSON or intended reference.

Treat the following as public API:

- Token names
- Exported JavaScript identifiers
- TypeScript declarations
- CSS custom-property names
- Package export subpaths

## Working on icons

Icon source belongs under `packages/icons/src/`, and every public icon must be exported through `packages/icons/src/index.ts`.

When adding an icon:

1. Follow the existing icon component and naming convention.
2. Preserve the SVG `viewBox`.
3. Use `currentColor` where the icon is intended to inherit text color.
4. Support appropriate SVG props using the package's existing public icon-prop type.
5. Avoid embedded raster data, scripts, inline event handlers, and unnecessary SVG metadata.
6. Provide an accessible name when the icon conveys meaning, or support decorative usage with `aria-hidden`.
7. Export the icon from `src/index.ts`.
8. Build and test the package:

   ```bash
   pnpm --filter @pivotandhelm/icons build
   pnpm --filter @pivotandhelm/icons test
   ```

9. Add a Changeset for a published addition, fix, removal, or rename.

React must remain a peer dependency and must not be bundled into the icon package.

## Working on UI components

Use the established component layout:

```text
packages/ui/src/<component>/
├── Component.tsx
├── component.css
├── Component.test.tsx
└── Component.stories.tsx
```

Match the existing capitalization and filename convention when the component differs from this example.

Every new public component must include:

- A typed React implementation
- A side-effect import of its local CSS when the established package pattern requires it
- Semantic HTML
- Keyboard-accessible behavior where interactive
- Forwarding of appropriate native HTML attributes
- Unit tests with Vitest and the repository's React testing utilities
- Storybook stories using `@storybook/react-vite` types
- Public export from `packages/ui/src/index.ts`
- A Changeset

Use tokens through supported public package exports such as:

```ts
import "@pivotandhelm/tokens/css";
```

Do not import from `packages/tokens/src`, `packages/icons/src`, or another package's `dist` directory.

Build and test UI changes:

```bash
pnpm --filter @pivotandhelm/ui build
pnpm --filter @pivotandhelm/ui test
pnpm test:storybook
```

React and React DOM must remain peer/external dependencies rather than being bundled into the published UI package.

## Storybook requirements

Storybook configuration belongs under `apps/storybook/.storybook/`. Component stories normally remain next to their components under `packages/ui/src/`.

Stories must:

- Use `Meta` and `StoryObj` types from `@storybook/react-vite`.
- Represent meaningful variants, states, sizes, and disabled/error behavior.
- Use controls where they help consumers understand the API.
- Avoid snapshots of incidental implementation details.
- Include interaction coverage where user behavior needs validation.
- Use the public package API rather than deep source or `dist` imports where practical.

The global preview imports token CSS through:

```ts
import "@pivotandhelm/tokens/css";
```

Validate Storybook changes:

```bash
pnpm build:storybook
pnpm test:storybook
```

Review visual changes in Chromatic before merging.

## Testing expectations

Tests should verify externally observable behavior rather than internal implementation.

- Token tests verify expected exports and representative generated CSS variables.
- Icon tests verify public exports, SVG rendering, prop forwarding, and accessibility behavior.
- UI tests verify rendering, variants, events, native attribute forwarding, and accessible roles/names.
- Storybook browser tests verify that stories render and interactions work in a real browser.

Do not delete, skip, weaken, or broadly mock a failing test merely to make CI pass.

## Formatting, linting, type checking, and builds

Before opening or updating a pull request, run:

```bash
pnpm format
pnpm check
pnpm test:storybook
pnpm exec changeset status
```

`pnpm format` writes Prettier fixes. `pnpm check` is the repository's aggregate validation command and must remain the canonical CI-equivalent check.

If a command fails, fix the underlying source, configuration, test, or dependency issue. Do not bypass ESLint, Prettier, TypeScript, Vitest, Vite, Turborepo, or Storybook checks.

## Changesets and semantic versioning

All consumer-visible changes to `@pivotandhelm/tokens`, `@pivotandhelm/icons`, or `@pivotandhelm/ui` require a Changeset:

```bash
pnpm changeset
pnpm exec changeset status
```

During `0.x` development:

- Use patch for backward-compatible fixes.
- Use minor for new functionality.
- Explicitly identify breaking changes in the Changeset and pull request.

From `1.0.0`:

- Patch: backward-compatible bug fixes.
- Minor: backward-compatible features.
- Major: incompatible public API changes.

Documentation, test, or workflow-only changes that do not affect a published package may use an empty Changeset when the repository's status check requires one:

```bash
pnpm changeset add --empty
```

Never manually edit package versions or create release tags when the Changesets release workflow owns those operations.

## Commit and pull-request expectations

Use a concise conventional-style commit message where practical:

```text
feat(ui): add badge component
fix(tokens): correct semantic color reference
docs(storybook): document button states
```

A pull request must state:

- What changed and why
- Packages affected
- Public API and version impact
- Tests run
- Storybook and Chromatic impact
- Accessibility impact
- Changeset type
- Migration instructions for a breaking change

Keep pull requests focused. Separate unrelated package upgrades, refactors, API changes, and visual redesigns.

## Security and secrets

- Never commit or print npm, GitHub, Chromatic, or Figma credentials.
- Never put secrets in issues, prompts, stories, fixtures, or snapshots.
- Do not increase GitHub Actions permissions without maintainer review.
- Review new and updated dependencies for necessity, maintenance, licensing, and supply-chain risk.
- Do not publish packages or approve release pull requests without authorization.

## AI-assisted contributions

AI-assisted code is held to the same standards as manually written code. The contributor remains responsible for correctness, licensing, accessibility, security, tests, API compatibility, and the Changeset.

The repository must remain buildable and maintainable without GitHub Copilot or any other AI assistant.
