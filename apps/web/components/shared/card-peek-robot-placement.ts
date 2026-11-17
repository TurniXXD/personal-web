// Where the card robot may appear: card selection, free edges and anchors.
// Pure DOM geometry, kept apart from the component's timing and state.

export const CARD_SELECTOR = [
  '[data-slot="card"]',
  "[data-event-card]",
  ".testimonial-card",
  ".service-detail-card",
].join(", ");

/** `localStorage[ROBOT_STORAGE_KEY] = "off"` disables the robot (E2E tests). */
export const ROBOT_STORAGE_KEY = "vantuch_card_robot";

export const ROBOT_WIDTH = 58;
export const PEEK_HEIGHT = 52;
const MIN_CARD_WIDTH = 160;
/** Candidate spots along a card edge, away from its rounded corners. */
const ANCHORS = [0.2, 0.35, 0.5, 0.65, 0.8];

export type Edge = "top" | "left" | "right";
export type Position = {
  top: number;
  left: number;
  edge: Edge;
  bubbleAlign: "start" | "end";
};

export const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

export const robotDisabled = () => {
  try {
    return window.localStorage.getItem(ROBOT_STORAGE_KEY) === "off";
  } catch {
    return false;
  }
};

/** On phones the first event card sits right under the filters. */
const isFirstEventCardOnPhone = (element: Element) =>
  window.innerWidth < 640 &&
  element.matches("[data-events-grid] > li:first-child [data-event-card]");

/** The first row of automation examples sits right under the category filters. */
const isFirstRowAutomationCard = (element: Element) => {
  const grid = element.closest(".automation-catalog__grid");
  const first = grid?.firstElementChild;
  return (
    first != null &&
    Math.abs(
      element.getBoundingClientRect().top - first.getBoundingClientRect().top,
    ) < 12
  );
};

export const isUsableCard = (element: Element) => {
  const rect = element.getBoundingClientRect();
  return (
    element instanceof HTMLElement &&
    !isFirstEventCardOnPhone(element) &&
    !isFirstRowAutomationCard(element) &&
    element.offsetParent !== null &&
    rect.width >= MIN_CARD_WIDTH &&
    rect.height >= 100
  );
};

export const isInViewport = (element: Element) => {
  const rect = element.getBoundingClientRect();
  // The head rises above the card, so its top edge must be comfortably visible.
  return rect.top > 140 && rect.top < window.innerHeight - 60;
};

export const eventsListingIsEmpty = () =>
  document.querySelector(
    '[data-events-state="empty"], [data-events-state="filtered-empty"]',
  ) !== null;

/** Event filters mark themselves busy while new results are loading. */
export const eventFiltersBusy = () =>
  document.querySelector('[data-event-filters][aria-busy="true"]') !== null;

/**
 * Stacked cards (typical on phones) leave too small a gap for the head to rise
 * above the top edge without covering the card above, so skip those.
 */
export const hasRoomAbove = (card: Element) => {
  const rect = card.getBoundingClientRect();
  const clearance = PEEK_HEIGHT + 12;
  return ![...document.querySelectorAll(CARD_SELECTOR)].some((other) => {
    if (other === card || other.contains(card) || card.contains(other))
      return false;
    const box = other.getBoundingClientRect();
    const overlapsColumn = box.left < rect.right && box.right > rect.left;
    return (
      overlapsColumn &&
      box.bottom <= rect.top + 1 &&
      box.bottom > rect.top - clearance
    );
  });
};

export type Box = { top: number; left: number; right: number; bottom: number };

const intersects = (a: Box, b: Box) =>
  a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

const MEDIA_SELECTOR = "img, video, svg, button, input, select, textarea";

/**
 * True when visible text, media, or controls outside the card would sit under
 * the robot, e.g. a section heading right above the first card.
 */
const coversContent = (card: Element, box: Box) => {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        if (node instanceof Text)
          return node.data.trim()
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        const element = node as Element;
        if (
          element === card ||
          element.matches('[data-card-robot], [aria-hidden="true"], script')
        )
          return NodeFilter.FILTER_REJECT;
        const rect = element.getBoundingClientRect();
        // `display: contents` wrappers have no box of their own.
        if (!rect.width && !rect.height) return NodeFilter.FILTER_SKIP;
        if (!intersects(rect, box)) return NodeFilter.FILTER_REJECT;
        return element.matches(MEDIA_SELECTOR)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      },
    },
  );
  const range = document.createRange();
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (!(node instanceof Text)) return true;
    const style = getComputedStyle(node.parentElement!);
    if (style.visibility === "hidden" || style.opacity === "0") continue;
    range.selectNodeContents(node);
    if ([...range.getClientRects()].some((line) => intersects(line, box)))
      return true;
  }
  return false;
};

/** Viewport box of the robot on the given card edge. */
export const robotBox = (rect: DOMRect, edge: Edge, anchor: number): Box => {
  const left =
    edge === "left"
      ? rect.left - ROBOT_WIDTH
      : edge === "right"
        ? rect.right
        : Math.min(
            Math.max(
              rect.left + rect.width * anchor - ROBOT_WIDTH / 2,
              rect.left + 16,
            ),
            rect.right - ROBOT_WIDTH - 16,
          );
  const top =
    edge === "top"
      ? rect.top - PEEK_HEIGHT
      : Math.min(
          Math.max(
            rect.top + rect.height * anchor - PEEK_HEIGHT / 2,
            rect.top + 16,
          ),
          rect.bottom - PEEK_HEIGHT - 16,
        );
  return {
    top,
    left,
    right: left + ROBOT_WIDTH,
    bottom: top + PEEK_HEIGHT,
  };
};

/** A random anchor along the card edge where the robot covers no content. */
export const freeAnchor = (card: Element) => {
  const rect = card.getBoundingClientRect();
  const edge = cardEdge(card);
  const start = Math.floor(Math.random() * ANCHORS.length);
  const anchors = ANCHORS.map(
    (_, index) => ANCHORS[(start + index) % ANCHORS.length],
  );
  return anchors.find(
    (anchor) => !coversContent(card, robotBox(rect, edge, anchor)),
  );
};

export const cardEdge = (card: Element): Edge => {
  if (window.innerWidth < 1024) return "top";
  const rect = card.getBoundingClientRect();
  const row = [...document.querySelectorAll(CARD_SELECTOR)]
    .filter(isUsableCard)
    .filter(
      (candidate) =>
        Math.abs(candidate.getBoundingClientRect().top - rect.top) < 12,
    );
  if (row.length < 2) return "top";
  const leftmost = row.reduce((left, candidate) =>
    candidate.getBoundingClientRect().left < left.getBoundingClientRect().left
      ? candidate
      : left,
  );
  const rightmost = row.reduce((right, candidate) =>
    candidate.getBoundingClientRect().right >
    right.getBoundingClientRect().right
      ? candidate
      : right,
  );
  if (card === leftmost && rect.left >= ROBOT_WIDTH + 16) return "left";
  if (card === rightmost && rect.right <= window.innerWidth - ROBOT_WIDTH - 16)
    return "right";
  return "top";
};

/**
 * A small purple robot that grabs the edge of one randomly chosen card,
 * peeks out, and hides again; hovering it shows a waving speech bubble.
 * Purely decorative: hidden from assistive technology and never blocks the
 * card's own interactions.
 */
