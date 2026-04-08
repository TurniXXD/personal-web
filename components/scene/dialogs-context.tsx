"use client";

import { createContext, useContext } from "react";
import type { SectionId } from "@/lib/site-data";
import type { SceneDialogRefs } from "@/components/scene/types";

type PipelineDialogsContextValue = SceneDialogRefs & {
  openDialogSection: SectionId | null;
};

const PipelineDialogsContext =
  createContext<PipelineDialogsContextValue | null>(null);

export const usePipelineDialogs = () => {
  const context = useContext(PipelineDialogsContext);

  if (!context) {
    throw new Error(
      "usePipelineDialogs must be used inside PipelineDialogsContext",
    );
  }

  return context;
};

export const PipelineDialogsProvider = PipelineDialogsContext.Provider;
