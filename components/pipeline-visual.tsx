"use client";

import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useAppShellScene } from "@/components/app-shell-scene-context";
import { PipelineDialogsProvider } from "@/components/scene/dialogs-context";
import {
  AboutDialog,
  CapabilitiesDialog,
  ContactDialog,
  WorkDialog,
} from "@/components/scene/dialogs";
import { PipelineSceneCanvas } from "@/components/scene/scene-canvas";
import { useContactForm } from "@/components/scene/use-contact-form";
import { useSceneInteraction } from "@/components/scene/use-scene-interaction";

export const PipelineVisual = () => {
  const {
    activeSection,
    onSelectSection,
    zoom,
    onZoomChange,
    minZoom,
    maxZoom,
    onDialogSectionChange,
    viewResetToken,
    terminalDialogRequest,
  } = useAppShellScene();
  const aboutDialogRef = useRef<HTMLDivElement>(null);
  const workDialogRef = useRef<HTMLDivElement>(null);
  const capabilitiesDialogRef = useRef<HTMLDivElement>(null);
  const contactDialogRef = useRef<HTMLDivElement>(null);
  const [sceneLoaded, setSceneLoaded] = useState(false);
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
    forceCloseDialogs,
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
    handleSubmit: handleContactSubmit,
  } = useContactForm();

  const zoomRatio = (zoom - minZoom) / (maxZoom - minZoom);
  const fogNear = isCompactScreen ? 24 + zoom * 13 : 26 + zoom * 7;
  const fogFar = isCompactScreen ? 84 + zoom * 24 : 86 + zoom * 14;
  const ambientIntensity = isCompactScreen
    ? 0.48 + zoomRatio * 0.08
    : 0.62 + zoomRatio * 0.12;
  const directionalIntensity = isCompactScreen
    ? 0.68 + zoomRatio * 0.14
    : 0.9 + zoomRatio * 0.22;
  const violetLightIntensity = isCompactScreen
    ? 3.6 + zoomRatio * 2.2
    : 7 + zoomRatio * 5;
  const cyanLightIntensity = isCompactScreen
    ? 2.8 + zoomRatio * 1.8
    : 5 + zoomRatio * 4;
  const gridOpacity = isCompactScreen
    ? 0.26 + zoomRatio * 0.06
    : 0.22 + zoomRatio * 0.08;

  useEffect(() => {
    onDialogSectionChange(openDialogSection);
  }, [onDialogSectionChange, openDialogSection]);

  return (
    <PipelineDialogsProvider
      value={{
        openDialogSection,
        aboutDialogRef,
        workDialogRef,
        capabilitiesDialogRef,
        contactDialogRef,
      }}
    >
      <div
        className={classNames(
          "scene-bg",
          hoveredSection && !isDragging && "scene-bg--interactive",
          isDragging && "scene-bg--dragging",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        onPointerLeave={onPointerLeave}
      >
        <div
          className={classNames(
            "scene-preloader",
            sceneLoaded && "scene-preloader--hidden",
          )}
          aria-hidden={sceneLoaded}
        >
          <div className="scene-preloader__pulse" />
          <div className="scene-preloader__label">Loading simulation</div>
        </div>

        <AboutDialog
          dialogRef={aboutDialogRef}
          open={openDialogSection === "about"}
          interactionProps={dialogInteractionProps}
          onClose={forceCloseDialogs}
        />
        <WorkDialog
          dialogRef={workDialogRef}
          open={openDialogSection === "work"}
          interactionProps={dialogInteractionProps}
          onClose={forceCloseDialogs}
        />
        <CapabilitiesDialog
          dialogRef={capabilitiesDialogRef}
          open={openDialogSection === "capabilities"}
          interactionProps={dialogInteractionProps}
          onClose={forceCloseDialogs}
        />
        <ContactDialog
          dialogRef={contactDialogRef}
          open={openDialogSection === "contact"}
          interactionProps={dialogInteractionProps}
          onClose={forceCloseDialogs}
          onSubmit={handleContactSubmit}
          errors={contactErrors}
          status={contactStatus}
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
          onSelectSection={handleSelectSection}
          onHoverSection={setHoveredSection}
          closeDialogs={closeDialogs}
          onSceneReady={() => setSceneLoaded(true)}
          targetPan={targetPan}
          zoom={zoom}
          maxZoom={maxZoom}
          viewResetToken={viewResetToken}
        />
      </div>
    </PipelineDialogsProvider>
  );
};
