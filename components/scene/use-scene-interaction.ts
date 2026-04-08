import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type WheelEvent,
} from "react";
import * as THREE from "three";
import type { SectionId } from "@/lib/site-data";
import {
  PAN_LIMIT_X,
  PAN_LIMIT_Z,
  WHEEL_ZOOM_STEP,
} from "@/components/scene/config";
import type { DialogInteractionProps } from "@/components/scene/dialogs";
import type {
  PanState,
  SectionChangeHandler,
  TerminalDialogRequest,
} from "@/components/scene/types";

type DragState = {
  pointerId: number;
  x: number;
  y: number;
  panX: number;
  panZ: number;
};

type PointerPosition = {
  x: number;
  y: number;
};

type PinchState = {
  distance: number;
  zoom: number;
};

type UseSceneInteractionParams = {
  activeSection: SectionId | null;
  onSelectSection: SectionChangeHandler;
  zoom: number;
  onZoomChange: (value: number) => void;
  minZoom: number;
  maxZoom: number;
  terminalDialogRequest: TerminalDialogRequest | null;
};

export const useSceneInteraction = ({
  activeSection,
  onSelectSection,
  zoom,
  onZoomChange,
  minZoom,
  maxZoom,
  terminalDialogRequest,
}: UseSceneInteractionParams) => {
  // Pan lives in refs so camera motion can interpolate it without rerendering every frame.
  const targetPan = useRef<PanState>({ x: 0, z: 0 });
  const hasInitializedDialogSyncRef = useRef(false);
  const dragState = useRef<DragState | null>(null);
  const dragMovedRef = useRef(false);
  const activePointersRef = useRef(new Map<number, PointerPosition>());
  const pinchStateRef = useRef<PinchState | null>(null);

  const [isCompactScreen, setIsCompactScreen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<SectionId | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [openDialogSection, setOpenDialogSection] = useState<SectionId | null>(
    null,
  );
  const [dialogInteracting, setDialogInteracting] = useState(false);

  useEffect(() => {
    const syncCompactState = () => {
      setIsCompactScreen(window.innerWidth <= 1024);
    };

    syncCompactState();
    window.addEventListener("resize", syncCompactState);
    return () => window.removeEventListener("resize", syncCompactState);
  }, []);

  useEffect(() => {
    // Mirror section selection into dialog state after the initial mount pass.
    if (!hasInitializedDialogSyncRef.current) {
      hasInitializedDialogSyncRef.current = true;
      return;
    }

    if (activeSection === null) {
      setOpenDialogSection(null);
      setDialogInteracting(false);
      return;
    }

    setOpenDialogSection(activeSection);
    setDialogInteracting(false);
  }, [activeSection]);

  useEffect(() => {
    if (!terminalDialogRequest) {
      return;
    }

    setOpenDialogSection(terminalDialogRequest.section);
    setDialogInteracting(false);
  }, [terminalDialogRequest]);

  const dialogInteractionProps: DialogInteractionProps = {
    // Stop scene gestures from stealing input while the user is working inside a dialog.
    onPointerEnter: () => setDialogInteracting(true),
    onPointerLeave: () => setDialogInteracting(false),
    onPointerDown: (event) => {
      setDialogInteracting(true);
      event.stopPropagation();
    },
    onPointerMove: (event) => {
      if (dialogInteracting) {
        event.stopPropagation();
      }
    },
    onWheelCapture: (event) => {
      setDialogInteracting(true);
      event.stopPropagation();
    },
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const clickedInsideDialog = Boolean(
      (event.target as HTMLElement).closest(".work-dialog"),
    );

    // Clicking the board outside a dialog dismisses it before starting a new gesture.
    if (openDialogSection && !clickedInsideDialog) {
      setOpenDialogSection(null);
      setDialogInteracting(false);
    }
    if (clickedInsideDialog) {
      return;
    }

    activePointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    // Two active pointers switch interaction from pan to pinch zoom.
    if (activePointersRef.current.size >= 2) {
      const [firstPointer, secondPointer] = Array.from(
        activePointersRef.current.values(),
      );
      const pinchDistance = Math.hypot(
        secondPointer.x - firstPointer.x,
        secondPointer.y - firstPointer.y,
      );

      pinchStateRef.current = {
        distance: pinchDistance,
        zoom,
      };
      dragState.current = null;
      setIsDragging(false);
      return;
    }

    setIsDragging(true);
    dragMovedRef.current = false;
    dragState.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      panX: targetPan.current.x,
      panZ: targetPan.current.z,
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (activePointersRef.current.has(event.pointerId)) {
      activePointersRef.current.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });
    }

    if (activePointersRef.current.size >= 2) {
      const [firstPointer, secondPointer] = Array.from(
        activePointersRef.current.values(),
      );
      const pinchDistance = Math.hypot(
        secondPointer.x - firstPointer.x,
        secondPointer.y - firstPointer.y,
      );
      const pinchState = pinchStateRef.current;

      if (pinchState && pinchState.distance > 0 && pinchDistance > 0) {
        // Pinch zoom scales relative to the distance captured when the gesture started.
        const pinchRatio = pinchState.distance / pinchDistance;
        const nextZoom = THREE.MathUtils.clamp(
          pinchState.zoom * pinchRatio,
          minZoom,
          maxZoom,
        );
        onZoomChange(nextZoom);
      } else {
        pinchStateRef.current = {
          distance: pinchDistance,
          zoom,
        };
      }

      return;
    }

    const drag = dragState.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - drag.x;
    const deltaY = event.clientY - drag.y;
    const movedFarEnough = Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6;

    if (movedFarEnough) {
      dragMovedRef.current = true;
    }

    if (window.innerWidth <= 1024 && movedFarEnough && !dialogInteracting) {
      setOpenDialogSection(null);
    }

    // Dragging shifts the camera target within the authored board limits.
    targetPan.current = {
      x: THREE.MathUtils.clamp(
        drag.panX - deltaX * 0.08,
        -PAN_LIMIT_X,
        PAN_LIMIT_X,
      ),
      z: THREE.MathUtils.clamp(
        drag.panZ - deltaY * 0.08,
        -PAN_LIMIT_Z,
        PAN_LIMIT_Z,
      ),
    };
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    activePointersRef.current.delete(event.pointerId);

    if (dragState.current?.pointerId === event.pointerId) {
      dragState.current = null;
      setIsDragging(false);
    }

    if (activePointersRef.current.size < 2) {
      pinchStateRef.current = null;
    }
  };

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    // Trackpads with ctrlKey generate finer deltas, so they use proportional zoom steps.
    const zoomStep = event.ctrlKey
      ? Math.abs(event.deltaY) * 0.0035
      : WHEEL_ZOOM_STEP;
    const nextZoom = zoom + (event.deltaY > 0 ? zoomStep : -zoomStep);
    onZoomChange(THREE.MathUtils.clamp(nextZoom, minZoom, maxZoom));
  };

  const handleSelectSection = (section: SectionId) => {
    if (openDialogSection === section) {
      setOpenDialogSection(null);
      setDialogInteracting(false);
      onSelectSection(section);
      return;
    }

    setOpenDialogSection(section);
    setDialogInteracting(false);
    onSelectSection(section);
  };

  const closeDialogs = () => {
    // Ignore pointer-miss closes that were really part of an active drag gesture.
    if (!dragMovedRef.current && !dialogInteracting) {
      setOpenDialogSection(null);
    }
  };

  const forceCloseDialogs = () => {
    setOpenDialogSection(null);
    setDialogInteracting(false);
  };

  const onPointerLeave = () => {
    activePointersRef.current.clear();
    pinchStateRef.current = null;
    dragState.current = null;
    setHoveredSection(null);
    setIsDragging(false);
  };

  return {
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
  };
};
