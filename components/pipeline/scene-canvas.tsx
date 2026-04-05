import { Canvas } from "@react-three/fiber";
import {
  FLOOR_SEGMENTS,
  FLOOR_SIZE,
  GRID_DIVISIONS,
} from "@/components/pipeline/config";
import { CircuitLines } from "@/components/pipeline/circuit";
import { FocusRig } from "@/components/pipeline/focus-rig";
import { SceneNodes } from "@/components/pipeline/nodes";
import { WorkDialogAnchor } from "@/components/pipeline/dialogs";
import type {
  DialogVisibilityState,
  HoverSectionHandler,
  SceneDialogRefs,
  SceneSelectionState,
  SectionChangeHandler,
  TargetPanRef,
} from "@/components/pipeline/types";

type SceneCanvasLightingProps = {
  fogNear: number;
  fogFar: number;
  ambientIntensity: number;
  directionalIntensity: number;
  violetLightIntensity: number;
  cyanLightIntensity: number;
  gridOpacity: number;
};

type SceneCanvasControlsProps = {
  onSelectSection: SectionChangeHandler;
  onHoverSection: HoverSectionHandler;
  closeDialogs: () => void;
  onSceneReady: () => void;
  targetPan: TargetPanRef;
  zoom: number;
  maxZoom: number;
  viewResetToken: number;
};

type PipelineSceneCanvasProps = SceneCanvasLightingProps &
  SceneSelectionState &
  DialogVisibilityState &
  SceneDialogRefs &
  SceneCanvasControlsProps;

export function PipelineSceneCanvas({
  fogNear,
  fogFar,
  ambientIntensity,
  directionalIntensity,
  violetLightIntensity,
  cyanLightIntensity,
  gridOpacity,
  activeSection,
  hoveredSection,
  openDialogSection,
  onSelectSection,
  onHoverSection,
  closeDialogs,
  onSceneReady,
  targetPan,
  zoom,
  maxZoom,
  viewResetToken,
  aboutDialogRef,
  workDialogRef,
  skillsDialogRef,
  contactDialogRef,
}: PipelineSceneCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 12, 24], fov: 36 }}
      onPointerMissed={closeDialogs}
      onCreated={() => {
        window.requestAnimationFrame(() => {
          onSceneReady();
        });
      }}
    >
      <color attach="background" args={["#ffffff"]} />
      <fog attach="fog" args={["#ffffff", fogNear, fogFar]} />
      <ambientLight intensity={ambientIntensity} />
      <directionalLight position={[8, 16, 10]} intensity={directionalIntensity} color="#f6f7ff" />
      <pointLight position={[-10, 8, 10]} intensity={violetLightIntensity} distance={28} color="#8d81ff" />
      <pointLight position={[14, 6, -6]} intensity={cyanLightIntensity} distance={24} color="#56d2c0" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]}>
        <planeGeometry args={[FLOOR_SIZE, FLOOR_SIZE, FLOOR_SEGMENTS, FLOOR_SEGMENTS]} />
        <meshBasicMaterial color="#c7d0f8" wireframe transparent opacity={gridOpacity} />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.39, 0]}
        onClick={(event) => {
          event.stopPropagation();
          closeDialogs();
        }}
      >
        <planeGeometry args={[FLOOR_SIZE, FLOOR_SIZE]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <gridHelper args={[FLOOR_SIZE, GRID_DIVISIONS, "#aab7ff", "#e4e9fb"]} position={[0, -0.38, 0]} />
      <CircuitLines />
      <SceneNodes
        activeSection={openDialogSection}
        hoveredSection={hoveredSection}
        onSelect={onSelectSection}
        onHover={onHoverSection}
      />
      <FocusRig
        activeSection={activeSection}
        targetPan={targetPan}
        zoom={zoom}
        maxZoom={maxZoom}
        viewResetToken={viewResetToken}
      />
      <WorkDialogAnchor section="about" openDialogSection={openDialogSection} dialogRef={aboutDialogRef} />
      <WorkDialogAnchor section="work" openDialogSection={openDialogSection} dialogRef={workDialogRef} />
      <WorkDialogAnchor section="skills" openDialogSection={openDialogSection} dialogRef={skillsDialogRef} />
      <WorkDialogAnchor section="contact" openDialogSection={openDialogSection} dialogRef={contactDialogRef} />
    </Canvas>
  );
}
