import * as THREE from "three";
import type { SectionId } from "@/lib/site-data";

type Translator = (key: string) => string;

export const getAboutCards = (t: Translator) =>
  [
    {
      title: t("cards.developer.title"),
      summary: t("cards.developer.summary"),
      accent: "violet",
    },
    {
      title: t("cards.technologies.title"),
      summary: t("cards.technologies.summary"),
      accent: "cyan",
    },
    {
      title: t("cards.focus.title"),
      summary: t("cards.focus.summary"),
      accent: "blue",
    },
  ] as const;

export type NodeConfig = {
  id: SectionId;
  position: [number, number, number];
  scale: [number, number, number];
  label: string;
};

// The scene layout is authored as plain data so geometry, labels and camera logic all share it.
export const getSceneNodes = (t: Translator): NodeConfig[] => [
  {
    id: "about",
    position: [-7, 0.8, 8],
    scale: [1.8, 1.8, 1.8],
    label: t("labels.about"),
  },
  {
    id: "work",
    position: [9, 0.8, 5],
    scale: [2.1, 2.1, 2.1],
    label: t("labels.work"),
  },
  {
    id: "capabilities",
    position: [-4, 0.8, -11],
    scale: [1.9, 1.9, 1.9],
    label: t("labels.capabilities"),
  },
  {
    id: "contact",
    position: [15, 0.8, -9],
    scale: [1.75, 1.75, 1.75],
    label: t("labels.contact"),
  },
];

// Camera/board constants live here to keep the rendering math deterministic across files.
export const fixedCameraOffset = new THREE.Vector3(0, 12, 24);
export const PAN_LIMIT_X = 16;
export const PAN_LIMIT_Z = 13;
export const WHEEL_ZOOM_STEP = 0.08;
export const CABLE_SIZE = 0.22;
export const FLOOR_SIZE = 240;
export const FLOOR_SEGMENTS = 144;
export const GRID_DIVISIONS = 72;

// Logical cable topology between section nodes.
export const circuitConnections: Array<[SectionId, SectionId]> = [
  ["about", "work"],
  ["about", "capabilities"],
  ["capabilities", "contact"],
  ["work", "contact"],
];

export const companyLinks = {
  appio: {
    href: "https://www.appio.dev/en",
  },
  proRocketeers: {
    href: "https://www.prorocketeers.com",
  },
} as const;
