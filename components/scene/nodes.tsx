import { useFrame } from "@react-three/fiber";
import { useTranslations } from "next-intl";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { getSceneNodes, type NodeConfig } from "@/components/scene/config";
import { usePipelineDialogs } from "@/components/scene/dialogs-context";
import type {
  HoverSectionHandler,
  SectionChangeHandler,
} from "@/components/scene/types";

type StopPropagationEvent = {
  stopPropagation: () => void;
};

type SceneCubeProps = {
  config: NodeConfig;
  active: boolean;
  hovered: boolean;
  onSelect: SectionChangeHandler;
  onHover: HoverSectionHandler;
};

type ActiveCubeMarkerProps = {
  config: NodeConfig;
  tone: "active" | "hover";
};

type GroundLabelProps = {
  config: NodeConfig;
};

type SceneNodesProps = {
  onSelect: SectionChangeHandler;
  onHover: HoverSectionHandler;
  hoveredSection: NodeConfig["id"] | null;
};

export const SceneCube = ({
  config,
  active,
  hovered,
  onSelect,
  onHover,
}: SceneCubeProps) => {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const ledMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const hitScale = useMemo<[number, number, number]>(() => {
    // The visible cube is small, so interaction uses a larger invisible hit box.
    return [
      config.scale[0] * 1.55,
      config.scale[1] * 1.55,
      config.scale[2] * 1.55,
    ];
  }, [config.scale]);
  const ledOffsets = useMemo(() => [0.15, 0.88, 1.61], []);
  const bodyShape = useMemo(() => {
    // Build a rounded 2D profile first, then extrude it into the hardware block shape.
    const shape = new THREE.Shape();
    const radius = 0.14;
    const x = -0.5;
    const y = -0.5;

    shape.moveTo(x + radius, y);
    shape.lineTo(x + 1 - radius, y);
    shape.quadraticCurveTo(x + 1, y, x + 1, y + radius);
    shape.lineTo(x + 1, y + 1 - radius);
    shape.quadraticCurveTo(x + 1, y + 1, x + 1 - radius, y + 1);
    shape.lineTo(x + radius, y + 1);
    shape.quadraticCurveTo(x, y + 1, x, y + 1 - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);

    return shape;
  }, []);
  const bodyGeometry = useMemo(() => {
    // The translated geometry keeps the mesh centered after extrusion.
    const geometry = new THREE.ExtrudeGeometry(bodyShape, {
      depth: 1,
      bevelEnabled: false,
      curveSegments: 24,
      steps: 1,
    });
    geometry.translate(0, 0, -0.5);
    return geometry;
  }, [bodyShape]);
  const ledDepth = config.scale[2] * 0.5 + 0.035;

  const handleSelect = (event: StopPropagationEvent) => {
    event.stopPropagation();
    onSelect(config.id);
  };

  const handleEnter = (event: StopPropagationEvent) => {
    event.stopPropagation();
    onHover(config.id);
  };

  const handleLeave = (event: StopPropagationEvent) => {
    event.stopPropagation();
    onHover(null);
  };

  useFrame((_, delta) => {
    const material = materialRef.current;
    const mesh = meshRef.current;
    // Exponential smoothing keeps hover/active transitions stable across frame rates.
    const damping = 1 - Math.exp(-delta * 4.5);

    if (!material) {
      return;
    }

    material.emissiveIntensity = THREE.MathUtils.lerp(
      material.emissiveIntensity,
      active ? 0.32 : hovered ? 0.26 : 0.16,
      damping,
    );

    if (mesh) {
      const targetScale = active ? 1.06 : hovered ? 1.03 : 1;
      mesh.scale.lerp(
        new THREE.Vector3(
          config.scale[0] * targetScale,
          config.scale[1] * targetScale,
          config.scale[2] * targetScale,
        ),
        damping,
      );
    }

    ledMaterialsRef.current.forEach((ledMaterial, index) => {
      // Offset each LED pulse so the block feels alive rather than blinking in sync.
      const pulse =
        0.35 +
        Math.max(0, Math.sin(performance.now() * 0.0032 + ledOffsets[index])) *
          1.45;
      ledMaterial.emissiveIntensity = pulse;
    });
  });

  return (
    <group position={config.position}>
      {/* Active/hover rings are projected onto the floor to ground the floating block. */}
      {active ? (
        <ActiveCubeMarker config={config} tone="active" />
      ) : hovered ? (
        <ActiveCubeMarker config={config} tone="hover" />
      ) : null}

      {/* Invisible hit target makes the scene easier to interact with on touch devices. */}
      <mesh
        scale={hitScale}
        onPointerDown={handleSelect}
        onClick={handleSelect}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Visible block body. */}
      <mesh
        ref={meshRef}
        scale={config.scale}
        onPointerDown={handleSelect}
        onClick={handleSelect}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
      >
        <primitive object={bodyGeometry} attach="geometry" />
        <meshStandardMaterial
          ref={materialRef}
          color="#a8adb8"
          emissive="#8f95a1"
          emissiveIntensity={active ? 0.32 : hovered ? 0.26 : 0.16}
          metalness={0.12}
          roughness={0.52}
        />
      </mesh>

      {/* Front LEDs reinforce the "device" metaphor and provide subtle motion. */}
      {[-0.34, -0.12, 0.1].map((xOffset, index) => (
        <mesh
          key={`led-${index}`}
          position={[
            xOffset * config.scale[0],
            config.scale[1] * 0.3,
            ledDepth,
          ]}
        >
          <boxGeometry args={[0.12, 0.12, 0.07]} />
          <meshStandardMaterial
            ref={(material) => {
              if (material) {
                ledMaterialsRef.current[index] = material;
              }
            }}
            color={index === 1 ? "#8cf2cd" : "#9b7fff"}
            emissive={index === 1 ? "#8cf2cd" : "#9b7fff"}
            emissiveIntensity={0.8}
            metalness={0.14}
            roughness={0.28}
          />
        </mesh>
      ))}
    </group>
  );
};

const ActiveCubeMarker = ({ config, tone }: ActiveCubeMarkerProps) => {
  // Marker size scales with the node so different section blocks still feel related.
  const radius = Math.max(config.scale[0], config.scale[2]) * 1.86;
  const fillColor = tone === "active" ? "#7b52ff" : "#d7c8ff";
  const ringColor = tone === "active" ? "#8d68ff" : "#ede4ff";
  const fillOpacity = tone === "active" ? 0.22 : 0.14;
  const ringOpacity = tone === "active" ? 0.98 : 0.88;

  return (
    <group position={[0, -1.19, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius, 80]} />
        <meshBasicMaterial
          color={fillColor}
          transparent
          opacity={fillOpacity}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[radius * 0.88, radius, 96]} />
        <meshBasicMaterial
          color={ringColor}
          transparent
          opacity={ringOpacity}
          depthWrite={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export const GroundLabel = ({ config }: GroundLabelProps) => {
  // Labels are rendered into a canvas texture because text meshes would be heavier here.
  const labelOffset =
    config.id === "contact" ? 2.1 : config.id === "capabilities" ? 2.3 : 2.75;
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1344;
    canvas.height = 320;
    const context = canvas.getContext("2d", { alpha: true });

    if (!context) {
      return null;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#2a3152";
    context.font = '600 110px "Sora", "Avenir Next", "Segoe UI", sans-serif';
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(config.label, canvas.width / 2, canvas.height / 2);

    const createdTexture = new THREE.CanvasTexture(canvas);
    createdTexture.colorSpace = THREE.SRGBColorSpace;
    createdTexture.minFilter = THREE.LinearFilter;
    createdTexture.magFilter = THREE.LinearFilter;
    createdTexture.needsUpdate = true;
    return createdTexture;
  }, [config.label]);

  if (!texture) {
    return null;
  }

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[config.position[0], 0.02, config.position[2] + labelOffset]}
    >
      {/* A flat plane just above the floor avoids z-fighting with the grid below. */}
      <planeGeometry args={[7.8, 1.9]} />
      <meshBasicMaterial
        map={texture}
        transparent
        alphaTest={0.08}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
};

export const SceneNodes = ({
  hoveredSection,
  onSelect,
  onHover,
}: SceneNodesProps) => {
  const tScene = useTranslations("Scene");
  const { openDialogSection } = usePipelineDialogs();
  // Node definitions come from config so labels/positions stay centralized.
  const sceneNodes = useMemo(() => getSceneNodes(tScene), [tScene]);

  return (
    <>
      {sceneNodes.map((node) => (
        <group key={node.id}>
          <GroundLabel config={node} />
          <SceneCube
            config={node}
            active={node.id === openDialogSection}
            hovered={node.id === hoveredSection}
            onSelect={onSelect}
            onHover={onHover}
          />
        </group>
      ))}
    </>
  );
};
