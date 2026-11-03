# UI, CSS, motion, and accessibility

Read this document for component, layout, styling, animation, or responsive changes in `apps/web`.

## Component primitives

Reuse interactive primitives in this order:

1. Existing project shadcn component.
2. A shadcn component adapted to the project theme.
3. A Radix primitive styled with Tailwind.
4. A custom interaction only when neither model fits.

Radix owns focus management, keyboard navigation, dismissal, portals, and ARIA state. Style its `data-state`, `data-side`, `data-disabled`, and related attributes instead of recreating behavior.

- Keep project primitives composable through `className`, `data-slot`, `asChild`, CVA variants, and `cn`.
- Use CVA for meaningful variants and `cn` for class composition.
- Use Lucide icons by default. Decorative icons need `aria-hidden="true"`; icon-only controls need an accessible name.
- Links navigate and buttons perform actions. Preserve heading hierarchy and label every form control with useful autocomplete where applicable.

## Tailwind and CSS

- Tailwind CSS v4 handles layout, spacing, sizing, typography, color, borders, radii, shadows, responsive rules, and ordinary states.
- Use semantic theme variables from `apps/web/app/globals.css`. Repeated design decisions become semantic tokens under `@theme inline`.
- Name tokens by purpose, such as `border-card`, `surface-soft`, or `shadow-card`, not by a page or raw color.
- A one-off geometric value may use an arbitrary utility. Repeated colors, type sizes, radii, shadows, spacing, timing, and breakpoints need a token or shared variant.
- Do not use inline `style` for static presentation. Runtime values such as measured coordinates or typed CSS custom properties are allowed.

CSS Modules are reserved for complex keyframes, multi-element choreography, pseudo-element artwork, masks, procedural gradients, orbit paths, descendant-wide visual state, or runtime custom properties. Keep the module beside its component; ordinary layout and typography stay in Tailwind.

`apps/web/app/styles/*.css` is a legacy migration surface. Do not add new feature selectors there. When touching a selector, move ordinary declarations into the owning component and leave only global foundations or complex shared motion. Keep `globals.css` limited to Tailwind imports, semantic tokens, foundation rules, and explicitly documented legacy imports; do not add page-specific CSS.

## Hero and interaction rules

- Heroes contain the headline, supporting copy, actions, and one relevant visual.
- Never place decorative pipeline lines, connector tracks, or square-node dividers in or immediately after a hero.
- Service artwork must explain the service and remain subordinate to the content.
- Never move cards, buttons, links, icons, badges, or nested content upward on hover or focus.
- Remove existing upward hover or focus movement when touching an interaction.
- Feedback may change color, border, shadow, opacity, subtle scale or rotation, or an intentional horizontal arrow position.
- Hover and focus communicate the same state. Essential information cannot depend on hover.
- Use a consistent short transition for ordinary UI feedback.

## Scroll, pointer, and animation

- Reuse `ScrollReveal`, `ScrollAwareHeader`, and existing pointer-reactive helpers.
- Make scroll and pointer handlers passive where appropriate and batch visual updates with `requestAnimationFrame`.
- Prefer refs and CSS variables over React state for every-frame updates.
- Clamp and smooth pointer displacement so decorative layers remain in their composition.
- Every non-essential animation honors `prefers-reduced-motion: reduce` and renders a complete static state.
- Animation cannot shift layout, obscure controls, block pointer input, or make content depend on JavaScript activation.
- Sticky navigation reappears on upward scroll and stays visible while its menu is open or focus is inside it.

## Accessibility and responsive behavior

- Preserve visible keyboard focus using the semantic ring and primary tokens.
- Interactive controls must work with keyboard, touch, and pointer input. Keep Radix keyboard and focus behavior intact.
- Maintain readable contrast in default, hover, focus, open, disabled, and dark-surface states.
- Use mobile-first utilities and verify narrow phone, tablet, desktop, and WebKit behavior when layout or interaction changes.
- Reflow or simplify required content on mobile; do not hide it merely to make the layout fit.
- Avoid fixed heights for copy-heavy cards and translated text.
- Use `next/image` where appropriate, meaningful alt text, and realistic responsive `sizes`.
