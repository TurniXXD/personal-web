# Project instructions

## Hover motion

- Never add hover or focus animations that move an interface element upward. This includes cards, buttons, links, icons, badges, and their nested content.
- Do not use negative vertical translations such as `translateY(-...)`, `translate: 0 -...`, negative `top` changes, or equivalent motion in hover and focus states.
- Hover feedback may change color, border, shadow, opacity, scale, rotation, or intentional horizontal position, but the element's vertical position must remain fixed.
- When editing existing interactions, preserve this rule and remove any upward hover movement found in the touched UI.

## Content localization

- Whenever user-visible copy is changed, update both the Czech and English versions in the same change, even when the request provides wording in only one language.
