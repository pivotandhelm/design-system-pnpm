---
applyTo: "packages/icons/**/*"
---

# Icons package instructions

## Scope and purpose

- These instructions apply to `@pivotandhelm/icons` in `packages/icons`.
- The package publishes typed React components backed by optimized SVG markup.
- `packages/icons/src/index.ts` is the public source entry and must exist before building.

## Component conventions

- Place icon source components under `packages/icons/src/` following the existing filename and named-export convention.
- Use PascalCase component names and retain a stable, descriptive icon name.
- Use the package's existing icon-prop type. If no shared type exists, prefer a type based on `React.SVGProps<SVGSVGElement>` without weakening it to `any`.
- Forward supported SVG attributes such as `className`, `style`, `aria-*`, and event props.
- Preserve the SVG `viewBox`; do not derive it from fixed width and height values.
- Prefer `currentColor` for fills or strokes intended to inherit consumer color.
- Avoid hard-coded dimensions unless the established public API defines defaults that consumers can override.
- Do not embed raster images, scripts, inline event handlers, editor metadata, IDs that collide across renders, or unnecessary SVG groups.

## Accessibility

- Support decorative usage with `aria-hidden="true"` when the icon has no independent meaning.
- Support a meaningful accessible name through the established package convention when the icon conveys information.
- Do not add an unconditional title that creates duplicate or misleading accessible names.
- Interactive behavior belongs to the surrounding button or link, not to a bare icon, unless an explicitly designed interactive icon component exists.

## Public API and build

- Export every public icon from `packages/icons/src/index.ts`.
- Do not make consumers import an icon file through `src` or `dist`.
- Preserve ESM output and TypeScript declaration generation.
- Keep React external to the Vite build and declared as a peer dependency.
- Never edit `dist/` manually.

## Testing

- Test that the icon renders an `svg` with the expected `viewBox`.
- Test representative prop forwarding and accessibility behavior.
- Test the public named export when adding or renaming an icon.
- Avoid brittle snapshots of formatting-only SVG markup.

## Validation

Run from the monorepo root:

- `pnpm --filter @pivotandhelm/icons build`
- `pnpm --filter @pivotandhelm/icons test`
- `pnpm typecheck`
- `pnpm exec changeset status`

For a repository-wide check, also run `pnpm format` and `pnpm check`.

## Versioning

- Add a minor Changeset for a new backward-compatible icon export.
- Add a patch Changeset for a rendering, typing, or accessibility correction that preserves the public API.
- Treat removal, rename, or incompatible prop/type changes as breaking.
