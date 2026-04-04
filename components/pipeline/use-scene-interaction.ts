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
} from "@/components/pipeline/config";
import type { DialogInteractionProps } from "@/components/pipeline/dialogs";
import type {
  PanState,
  SectionChangeHandler,
  TerminalDialogRequest,
} from "@/components/pipeline/types";

type DragState = {
  pointerId: number;
  x: number;
  y: number;
  panX: number;
  panZ: number;
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

export function useSceneInteraction({
  activeSection,
  onSelectSection,
  zoom,
  onZoomChange,
  minZoom,
  maxZoom,
  terminalDialogRequest,
}: UseSceneInteractionParams) {
  const targetPan = useRef<PanState>({ x: 0, z: 0 });
  const hasInitializedDialogSyncRef = useRef(false);
  const dragState = useRef<DragState | null>(null);
  const dragMovedRef = useRef(false);

  const [isCompactScreen, setIsCompactScreen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<SectionId | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [openDialogSection, setOpenDialogSection] = useState<SectionId | null>(null);
  const [dialogInteracting, setDialogInteracting] = useState(false);

  useEffect(() => {
    function syncCompactState() {
      setIsCompactScreen(window.innerWidth <= 1024);
    }

    syncCompactState();
    window.addEventListener("resize", syncCompactState);
    return () => window.removeEventListener("resize", syncCompactState);
  }, []);

  useEffect(() => {
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
    onPointerEnter: () => setDialogInteracting(true),
    onPointerLeave: () => setDialogInteracting(false),
    onWheelCapture: (event) => {
      setDialogInteracting(true);
      event.stopPropagation();
    },
  };

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    const clickedInsideDialog = Boolean((event.target as HTMLElement).closest(".work-dialog"));

    if (openDialogSection && !clickedInsideDialog) {
      setOpenDialogSection(null);
      setDialogInteracting(false);
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
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
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

    targetPan.current = {
      x: THREE.MathUtils.clamp(drag.panX - deltaX * 0.045, -PAN_LIMIT_X, PAN_LIMIT_X),
      z: THREE.MathUtils.clamp(drag.panZ - deltaY * 0.045, -PAN_LIMIT_Z, PAN_LIMIT_Z),
    };
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (dragState.current?.pointerId === event.pointerId) {
      dragState.current = null;
      setIsDragging(false);
    }
  }

  function onWheel(event: WheelEvent<HTMLDivElement>) {
    if (window.innerWidth > 768) {
      return;
    }

    event.preventDefault();
    const nextZoom = zoom + (event.deltaY > 0 ? WHEEL_ZOOM_STEP : -WHEEL_ZOOM_STEP);
    onZoomChange(THREE.MathUtils.clamp(nextZoom, minZoom, maxZoom));
  }

  function handleSelectSection(section: SectionId) {
    if (openDialogSection === section) {
      setOpenDialogSection(null);
      setDialogInteracting(false);
      onSelectSection(section);
      return;
    }

    setOpenDialogSection(section);
    setDialogInteracting(false);
    onSelectSection(section);
  }

  function closeDialogs() {
    if (!dragMovedRef.current && !dialogInteracting) {
      setOpenDialogSection(null);
    }
  }

  function onPointerLeave() {
    setHoveredSection(null);
    setIsDragging(false);
  }

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
  };
}
