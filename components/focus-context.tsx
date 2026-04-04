"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { type SectionId } from "@/lib/site-data";
import type {
  ChildrenProps,
  NullableSectionChangeHandler,
} from "@/components/pipeline/types";

type FocusContextValue = {
  activeSection: SectionId | null;
  setActiveSection: NullableSectionChangeHandler;
};

const FocusContext = createContext<FocusContextValue | null>(null);

export function FocusProvider({ children }: ChildrenProps) {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  const value = useMemo(
    () => ({ activeSection, setActiveSection }),
    [activeSection],
  );

  return (
    <FocusContext.Provider value={value}>{children}</FocusContext.Provider>
  );
}

export function useFocus() {
  const context = useContext(FocusContext);

  if (!context) {
    throw new Error("useFocus must be used inside FocusProvider");
  }

  return context;
}
