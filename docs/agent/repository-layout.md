# Repository layout and code style

Read this document when adding, moving, or restructuring application code.

## Ownership

- `apps/web` and `apps/portfolio` deploy independently. Do not couple them through application imports.
- `packages/ui` is for assets and UI already consumed by both apps. Do not promote code there in anticipation of reuse.
- Keep feature files under an owning domain instead of placing them directly in `components`, `lib`, or `messages`.

For `apps/web`:

- UI composition belongs in `components/<domain>`, such as `home`, `services`, or `contact`.
- `components/ui` owns shadcn-style primitives.
- `components/shared` is for small components reused across multiple domains.
- Non-UI code belongs in `lib/<domain>`.
- Provider clients live in `lib/integrations`, observability in `lib/observability`, SEO in `lib/seo`, and route definitions in `lib/site`.
- Localized content lives in `messages` and mirrors the feature structure. Use descriptive filenames, never numbered variants.

## Route and component boundaries

- App Router pages validate parameters, load localized content and metadata, and compose domain components. Keep provider and parsing details out of React components, and keep presentation details out of route files.
- Prefer Server Components. Add `"use client"` only to the smallest leaf that needs state, effects, browser APIs, pointer or scroll input, or a client-only Radix primitive.
- Do not turn a page or large section into a Client Component for one interactive child.
- Repeated card families share a primitive and interaction model. Avoid bespoke markup, unexplained empty footer space, and inconsistent transition timing.

## Names and imports

- Filenames use kebab-case. React components and types use PascalCase. Functions and variables use camelCase.
- Shared enumeration-style constants use descriptive uppercase names.
- Use `@/` for imports across folders inside `apps/web`. Use relative imports for colocated files such as a component and its CSS Module.
- Remove dead code and obsolete files when replacing an implementation. Do not leave numbered backups or commented alternatives.
- Improve touched legacy boundaries toward the current rules instead of copying the legacy pattern.
- A refactor is complete only when its imports, tests, localized content, sitemap or SEO sources, and obsolete files are updated together.

## TypeScript

- Strict mode is the baseline. Do not introduce `any`, unchecked casts, or duplicate domain shapes to silence the compiler.
- Give every object parameter a named type. Component props use `ComponentNameProps`; helper inputs use a descriptive `...Params` type.
- Keep types near their domain owner and export them only when another module consumes them.
- Prefer readonly arrays and literal unions for finite content and route sets. Use `satisfies` when it preserves inference while checking a contract.
- Use early returns for invalid or unavailable states.
- Comments explain constraints and non-obvious decisions, not the syntax below them.
