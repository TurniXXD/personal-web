"use client";

import { createContext, useContext } from "react";
import type { SectionId } from "@/lib/site-data";
import type { SectionChangeHandler, TerminalDialogRequest } from "@/components/pipeline/types";

export type AppShellSceneContextValue = {
  activeSection: SectionId | null;
  onSelectSection: SectionChangeHandler;
  zoom: number;
  onZoomChange: (value: number) => void;
  minZoom: number;
  maxZoom: number;
  onDialogOpenChange: (open: boolean) => void;
  viewResetToken: number;
  terminalDialogRequest: TerminalDialogRequest | null;
};

export const AppShellSceneContext = createContext<AppShellSceneContextValue | null>(null);

export function useAppShellScene() {
  const context = useContext(AppShellSceneContext);

  if (!context) {
    throw new Error("useAppShellScene must be used inside AppShellSceneContext");
  }

  return context;
}
