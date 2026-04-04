"use client";

import { useEffect, useRef } from "react";
import { useAppShellScene } from "@/components/app-shell-scene-context";
import {
  AboutDialog,
  ContactDialog,
  SkillsDialog,
  WorkDialog,
} from "@/components/pipeline/dialogs";
import { PipelineSceneCanvas } from "@/components/pipeline/scene-canvas";
import { useContactForm } from "@/components/pipeline/use-contact-form";
import { useSceneInteraction } from "@/components/pipeline/use-scene-interaction";

export function PipelineVisual() {
  const {
    activeSection,
    onSelectSection,
    zoom,
    onZoomChange,
    minZoom,
    maxZoom,
    onDialogOpenChange,
    viewResetToken,
    terminalDialogRequest,
  } = useAppShellScene();
  const aboutDialogRef = useRef<HTMLDivElement>(null);
  const workDialogRef = useRef<HTMLDivElement>(null);
  const skillsDialogRef = useRef<HTMLDivElement>(null);
  const contactDialogRef = useRef<HTMLDivElement>(null);
  const {
    targetPan,
    isCompactScreen,
    hoveredSection,
    setHoveredSection,
    isDragging,
    openDialogSection,
    dialogInteractionProps,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerLeave,
    onWheel,
    handleSelectSection,
    closeDialogs,
  } = useSceneInteraction({
    activeSection,
    onSelectSection,
    zoom,
    onZoomChange,
    minZoom,
    maxZoom,
    terminalDialogRequest,
  });
  const {
    errors: contactErrors,
    status: contactStatus,
    message: contactMessage,
    handleSubmit: handleContactSubmit,
  } = useContactForm();

  const zoomRatio = (zoom - minZoom) / (maxZoom - minZoom);
  const fogNear = isCompactScreen ? 24 + zoom * 13 : 26 + zoom * 7;
  const fogFar = isCompactScreen ? 84 + zoom * 24 : 86 + zoom * 14;
  const ambientIntensity = isCompactScreen ? 0.48 + zoomRatio * 0.08 : 0.62 + zoomRatio * 0.12;
  const directionalIntensity = isCompactScreen ? 0.68 + zoomRatio * 0.14 : 0.9 + zoomRatio * 0.22;
  const violetLightIntensity = isCompactScreen ? 3.6 + zoomRatio * 2.2 : 7 + zoomRatio * 5;
  const cyanLightIntensity = isCompactScreen ? 2.8 + zoomRatio * 1.8 : 5 + zoomRatio * 4;
  const gridOpacity = isCompactScreen ? 0.26 + zoomRatio * 0.06 : 0.22 + zoomRatio * 0.08;

  useEffect(() => {
    onDialogOpenChange(openDialogSection !== null);
  }, [onDialogOpenChange, openDialogSection]);

  return (
    <div
      className={`scene-bg${
        hoveredSection && !isDragging ? " scene-bg--interactive" : ""
      }${isDragging ? " scene-bg--dragging" : ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
      onPointerLeave={onPointerLeave}
    >
      <AboutDialog
        dialogRef={aboutDialogRef}
        open={openDialogSection === "about"}
        interactionProps={dialogInteractionProps}
      />
      <WorkDialog
        dialogRef={workDialogRef}
        open={openDialogSection === "work"}
        interactionProps={dialogInteractionProps}
      />
      <SkillsDialog
        dialogRef={skillsDialogRef}
        open={openDialogSection === "skills"}
        interactionProps={dialogInteractionProps}
      />
      <ContactDialog
        dialogRef={contactDialogRef}
        open={openDialogSection === "contact"}
        interactionProps={dialogInteractionProps}
        onSubmit={handleContactSubmit}
        errors={contactErrors}
        status={contactStatus}
        message={contactMessage}
      />

      <PipelineSceneCanvas
        fogNear={fogNear}
        fogFar={fogFar}
        ambientIntensity={ambientIntensity}
        directionalIntensity={directionalIntensity}
        violetLightIntensity={violetLightIntensity}
        cyanLightIntensity={cyanLightIntensity}
        gridOpacity={gridOpacity}
        activeSection={activeSection}
        hoveredSection={hoveredSection}
        openDialogSection={openDialogSection}
        onSelectSection={handleSelectSection}
        onHoverSection={setHoveredSection}
        closeDialogs={closeDialogs}
        targetPan={targetPan}
        zoom={zoom}
        maxZoom={maxZoom}
        viewResetToken={viewResetToken}
        aboutDialogRef={aboutDialogRef}
        workDialogRef={workDialogRef}
        skillsDialogRef={skillsDialogRef}
        contactDialogRef={contactDialogRef}
      />
    </div>
  );
}
