# Project instructions

## Hero composition

- Never place decorative pipeline lines, connector tracks, or square-node dividers in or immediately after a hero section. Keep the hero focused on its headline, supporting copy, actions, and relevant visual.
- If these motifs are useful, place them between later content sections instead.

## Hover motion

- Never add hover or focus animations that move an interface element upward. This includes cards, buttons, links, icons, badges, and their nested content.
- Do not use negative vertical translations such as `translateY(-...)`, `translate: 0 -...`, negative `top` changes, or equivalent motion in hover and focus states.
- Hover feedback may change color, border, shadow, opacity, scale, rotation, or intentional horizontal position, but the element's vertical position must remain fixed.
- When editing existing interactions, preserve this rule and remove any upward hover movement found in the touched UI.

## Content localization

- Whenever user-visible copy is changed, update both the Czech and English versions in the same change, even when the request provides wording in only one language.
- Store user-visible copy in the locale message catalogs and read it through `next-intl`; do not add language conditionals or literal UI copy inside components.
- Keep route segments and slugs in shared semantic constants. Do not compare or assemble route slugs from ad-hoc string literals in components.

## TypeScript props

- Define function and component object parameters as named types such as `ComponentNameProps`; never declare an object type inline in a parameter list.

## Styling

- Prefer Tailwind utility classes for layout, spacing, sizing, typography, colors, borders, shadows, responsive states, and ordinary hover/focus states.
- Use CSS modules only when the style depends on complex keyframes, pseudo-element artwork, CSS masks, multi-element state choreography, or runtime CSS variables that would be less readable as utilities.
- When touching an existing CSS module, move any ordinary static declarations that fit Tailwind into the component instead of expanding the module.

## Search engine discovery

- Whenever a public page is added, removed, renamed, or changes its canonical route, update `apps/web/app/sitemap.ts` in the same change for both Czech and English URLs.
- Keep `apps/web/app/robots.ts` aligned with the current public site and ensure it continues to expose the canonical sitemap URL. Update its allow/disallow rules in the same change whenever route visibility or indexing requirements change.
- Prefer shared route or slug sources for dynamic pages so the page generator and sitemap cannot drift apart.
