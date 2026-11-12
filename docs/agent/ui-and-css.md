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

## Rendering performance in Firefox and Safari

Chromium hides costs that freeze Gecko and WebKit. The homepage once ran at 2–5 fps in Firefox and Safari while Chrome stayed at 60 fps, because two costs stacked: an eagerly rendered Turnstile iframe, and infinite paint animations inside the blurred, 3D-transformed hero.

- No infinite animation of paint properties (`stroke-dashoffset`, `box-shadow`, `border-color`, `background`, `width`, `clip-path`, `filter`) inside heroes or other always-visible areas. Entrance animations run once and end in their final state (`animation: … both` with the last keyframe holding the finished look). Continuous decorative loops may animate only `transform` or `opacity` on a small element, and only outside layers that use `filter: blur`, `backdrop-filter`, `perspective`, or `mask-image`.
- Do not combine `backdrop-filter` or large `filter: blur()` with content that repaints every frame behind or inside it. Prefer an opaque or semi-opaque background over adding blur.
- Every-frame JavaScript loops (`requestAnimationFrame`) must stop once the values settle and must not write many CSS custom properties to an ancestor of large subtrees; each write restyles every descendant.
- Third-party widgets and iframes (Turnstile, embeds, maps, video) load lazily when their container nears the viewport or on first interaction, never on page load for below-the-fold content, at least in Firefox and WebKit. `TurnstileWidget` defers loading there (Chromium, detected by `navigator.userAgentData`, renders eagerly); reuse it.
- Verify any change to hero visuals, global layout, long-running animation, or third-party scripts in Firefox and WebKit, not only Chromium: run a production build and compare idle and scroll frame rates with the change against the same page without it. A drop below ~50 fps in Firefox is a regression.

## Accessibility and responsive behavior

- Preserve visible keyboard focus using the semantic ring and primary tokens.
- Interactive controls must work with keyboard, touch, and pointer input. Keep Radix keyboard and focus behavior intact.
- Maintain readable contrast in default, hover, focus, open, disabled, and dark-surface states.
- Use mobile-first utilities and verify narrow phone, tablet, desktop, and WebKit behavior when layout or interaction changes.
- Reflow or simplify required content on mobile; do not hide it merely to make the layout fit.
- Avoid fixed heights for copy-heavy cards and translated text.
- Use `next/image` where appropriate, meaningful alt text, and realistic responsive `sizes`.
