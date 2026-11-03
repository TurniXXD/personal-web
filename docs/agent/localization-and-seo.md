# Localization, routes, and SEO

Read this document when changing user-visible copy, public routes, metadata, or structured data.

## Localized content

- Czech and English are equal product variants. Update both locales in the same change even when a request mentions only one language.
- Store user-visible copy in the locale catalogs and read it through `next-intl`.
- Do not add language conditionals or literal UI sentences inside components.
- Brand names, protocol identifiers, schema.org keys, and genuinely language-neutral labels may remain constants.
- Keep message files aligned with feature ownership and use descriptive filenames.

## Routes and static generation

- Keep route segments and slugs in semantic constants in `apps/web/lib/site/routes.ts`.
- Do not compare or assemble localized slugs from ad-hoc strings in components.
- Page generation, navigation, canonical URLs, alternate-language links, and sitemap entries consume the same locale mapping.
- Public content pages remain statically generated:
  - enumerate locale and slug combinations with `generateStaticParams`;
  - call `setRequestLocale(locale)` before localized rendering;
  - keep request-specific data, cookies, headers, and mutations in API routes or client leaves;
  - do not opt public pages into dynamic rendering for convenience.

## Metadata and structured data

- Generate page metadata from the same localized copy as the page.
- Preserve canonical URLs and alternate-language URLs.
- Keep Google structured-data builders in `apps/web/lib/seo/structured-data.ts` and render them through `StructuredDataScript`.
- Human-readable schema values come from localized content. Stable identifiers and organization constants may remain in code.
- When a public page is added, removed, renamed, hidden, or changes canonical route, update `apps/web/app/sitemap.ts` for Czech and English in the same change.
- Keep `apps/web/app/robots.ts` aligned with public visibility and preserve the canonical sitemap URL.
