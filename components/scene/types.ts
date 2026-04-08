import type { MutableRefObject, ReactNode, RefObject } from "react";
import type { SectionId } from "@/lib/site-data";

export type PanState = {
  x: number;
  z: number;
};

export type TargetPanRef = MutableRefObject<PanState>;

export type SectionChangeHandler = (section: SectionId) => void;
export type NullableSectionChangeHandler = (section: SectionId | null) => void;
export type HoverSectionHandler = (section: SectionId | null) => void;

export type TerminalDialogRequest = {
  section: SectionId;
  token: number;
};

export type DialogRef = RefObject<HTMLDivElement | null>;

export type SceneSelectionState = {
  activeSection: SectionId | null;
  hoveredSection: SectionId | null;
};

export type SceneDialogRefs = {
  aboutDialogRef: DialogRef;
  workDialogRef: DialogRef;
  capabilitiesDialogRef: DialogRef;
  contactDialogRef: DialogRef;
};

export type ChildrenProps = {
  children: ReactNode;
};
