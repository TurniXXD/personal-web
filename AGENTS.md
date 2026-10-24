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

## Search engine discovery

- Whenever a public page is added, removed, renamed, or changes its canonical route, update `apps/web/app/sitemap.ts` in the same change for both Czech and English URLs.
- Keep `apps/web/app/robots.ts` aligned with the current public site and ensure it continues to expose the canonical sitemap URL. Update its allow/disallow rules in the same change whenever route visibility or indexing requirements change.
- Prefer shared route or slug sources for dynamic pages so the page generator and sitemap cannot drift apart.
