import { Canvas } from "@react-three/fiber";
import {
  FLOOR_SEGMENTS,
  FLOOR_SIZE,
  GRID_DIVISIONS,
} from "@/components/scene/config";
import { CircuitLines } from "@/components/scene/circuit";
import { usePipelineDialogs } from "@/components/scene/dialogs-context";
import { FocusRig } from "@/components/scene/focus-rig";
import { SceneNodes } from "@/components/scene/nodes";
import { WorkDialogAnchor } from "@/components/scene/dialogs";
import type {
  HoverSectionHandler,
  SceneSelectionState,
  SectionChangeHandler,
  TargetPanRef,
} from "@/components/scene/types";

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
  dpr: number | [number, number];
};

type PipelineSceneCanvasProps = SceneCanvasLightingProps &
  SceneSelectionState &
  SceneCanvasControlsProps;

export const PipelineSceneCanvas = ({
  fogNear,
  fogFar,
  ambientIntensity,
  directionalIntensity,
  violetLightIntensity,
  cyanLightIntensity,
  gridOpacity,
  activeSection,
  hoveredSection,
  onSelectSection,
  onHoverSection,
  closeDialogs,
  onSceneReady,
  targetPan,
  zoom,
  maxZoom,
  viewResetToken,
  dpr,
}: PipelineSceneCanvasProps) => {
  const { openDialogSection } = usePipelineDialogs();

  return (
    <Canvas
      // The canvas owns the full WebGL scene; camera motion is delegated to FocusRig.
      camera={{ position: [0, 12, 24], fov: 36 }}
      dpr={dpr}
      onPointerMissed={closeDialogs}
      onCreated={() => {
        // Wait one frame so overlays can measure against the mounted canvas correctly.
        window.requestAnimationFrame(() => {
          onSceneReady();
        });
      }}
    >
      {/* Keep the fog/background pair in sync so the scene fades into the page cleanly. */}
      <color attach="background" args={["#ffffff"]} />
      <fog attach="fog" args={["#ffffff", fogNear, fogFar]} />

      {/* Layered lights keep the hardware blocks readable without losing the soft neon accent. */}
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={[8, 16, 10]}
        intensity={directionalIntensity}
        color="#f6f7ff"
      />
      <pointLight
        position={[-10, 8, 10]}
        intensity={violetLightIntensity}
        distance={28}
        color="#8d81ff"
      />
      <pointLight
        position={[14, 6, -6]}
        intensity={cyanLightIntensity}
        distance={24}
        color="#56d2c0"
      />

      {/* The wireframe plane is the visual "board" the scene sits on. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]}>
        <planeGeometry
          args={[FLOOR_SIZE, FLOOR_SIZE, FLOOR_SEGMENTS, FLOOR_SEGMENTS]}
        />
        <meshBasicMaterial
          color="#c7d0f8"
          wireframe
          transparent
          opacity={gridOpacity}
        />
      </mesh>

      {/* This invisible hit plane lets users click empty space to dismiss open dialogs. */}
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

      {/* The helper grid adds depth cues on top of the denser wireframe plane. */}
      <gridHelper
        args={[FLOOR_SIZE, GRID_DIVISIONS, "#aab7ff", "#e4e9fb"]}
        position={[0, -0.38, 0]}
      />

      {/* Scene primitives are split by responsibility: cables, nodes, camera, then DOM anchors. */}
      <CircuitLines />
      <SceneNodes
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

      {/* Each dialog is still regular DOM; these anchors keep it glued to its 3D node. */}
      <WorkDialogAnchor section="about" />
      <WorkDialogAnchor section="work" />
      <WorkDialogAnchor section="capabilities" />
      <WorkDialogAnchor section="contact" />
    </Canvas>
  );
};
