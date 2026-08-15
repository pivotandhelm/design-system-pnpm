---
applyTo: "packages/tokens/**/*"
---

# Tokens package instructions

## Scope and purpose

- These instructions apply to `@pivotandhelm/tokens` in `packages/tokens`.
- This package transforms exported Figma token JSON with Style Dictionary and publishes JavaScript/TypeScript token exports plus CSS custom properties.
- Figma JSON under `packages/tokens/src/figma/` is the source of truth.

## Source and generated files

- Make token-value, hierarchy, naming, and reference changes only in the appropriate source JSON under `src/figma/`.
- Treat `src/generated/` and `dist/` as generated output. Never edit either manually.
- Do not create a hand-written replacement for `src/generated/tokens.ts` or other generated token modules.
- Do not commit `dist/`, coverage output, or package tarballs.

## Style Dictionary references

- Preserve intentional token aliases and semantic references.
- When Style Dictionary reports missing references, identify the exact unresolved path and compare it with the source token hierarchy and spelling.
- Fix the source token name, hierarchy, or reference. Do not silence reference errors or replace an alias with an arbitrary literal value.
- Do not normalize, rename, or flatten Figma token paths unless the issue explicitly defines the resulting public API.

## Public API and exports

- Treat exported token identifiers, CSS custom properties, TypeScript declarations, and package export subpaths as public API.
- Keep the JavaScript entry available through `@pivotandhelm/tokens`.
- Keep the CSS entry available through `@pivotandhelm/tokens/css`.
- Do not make consumers import `src/generated`, a relative workspace path, or `dist` directly.
- If package `exports` change, verify both JavaScript and CSS consumption from the built package.

## Implementation rules

- Keep Style Dictionary configuration in the package's existing configuration file and follow its current ESM format.
- Preserve ESM-compatible `.js` specifiers in emitted/imported TypeScript where required by the package tsconfig and Node module resolution.
- Build tokens before running tests that import generated modules.
- Do not weaken TypeScript settings to make a generated import resolve.

## Validation

Run from the monorepo root:

- `pnpm --filter @pivotandhelm/tokens build`
- `pnpm --filter @pivotandhelm/tokens test`
- `pnpm typecheck`
- `pnpm exec changeset status`

For a repository-wide check, also run `pnpm format` and `pnpm check`.

Tests should verify representative JavaScript exports, TypeScript usability, CSS custom properties, and the public CSS export path rather than the internal layout of generated files.

## Versioning

- Add a patch Changeset for backward-compatible token-value corrections.
- Add a minor Changeset for backward-compatible new tokens.
- Treat a renamed, removed, or incompatibly retyped token or CSS variable as breaking.
- During `0.x`, identify breaking changes explicitly. From `1.0.0`, use a major Changeset and include migration guidance.