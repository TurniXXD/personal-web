import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTranslations } from "next-intl";
import * as THREE from "three";
import { CABLE_SIZE, circuitConnections, getSceneNodes } from "@/components/pipeline/config";

function buildCircuitPath(
  start: [number, number, number],
  end: [number, number, number],
  laneOffset: number,
) {
  const startX = start[0];
  const startZ = start[2];
  const endX = end[0];
  const endZ = end[2];
  const travelY = 0.06;
  const midX = startX + (endX - startX) * 0.5 + laneOffset;

  return [
    new THREE.Vector3(startX, travelY, startZ),
    new THREE.Vector3(startX, travelY, startZ + laneOffset * 0.24),
    new THREE.Vector3(midX, travelY, startZ + laneOffset * 0.24),
    new THREE.Vector3(midX, travelY, endZ - laneOffset * 0.24),
    new THREE.Vector3(endX, travelY, endZ - laneOffset * 0.24),
    new THREE.Vector3(endX, travelY, endZ),
  ];
}

type CircuitTrace = {
  key: string;
  points: THREE.Vector3[];
};

type CircuitPacketProps = {
  trace: CircuitTrace;
  index: number;
};

function getCircuitTraces(sceneNodes: ReturnType<typeof getSceneNodes>) {
  return circuitConnections.flatMap(([fromId, toId], index) => {
    const from = sceneNodes.find((node) => node.id === fromId);
    const to = sceneNodes.find((node) => node.id === toId);

    if (!from || !to) {
      return [];
    }

    return [
      {
        key: `${fromId}-${toId}`,
        points: buildCircuitPath(
          from.position,
          to.position,
          (index % 2 === 0 ? 1 : -1) * 2.4,
        ),
      },
    ];
  });
}

function CircuitPacket({
  trace,
  index,
}: CircuitPacketProps) {
  const packetRef = useRef<THREE.Group>(null);
  const directionRef = useRef(new THREE.Vector3(1, 0, 0));
  const rotationRef = useRef(new THREE.Euler());
  const trailLength = CABLE_SIZE * 2.6;

  useFrame(({ clock }) => {
    const packet = packetRef.current;

    if (!packet) {
      return;
    }

    const points = trace.points;
    const segmentCount = points.length - 1;
    const progress = (clock.elapsedTime * 0.1 + index * 0.12) % 1;
    const scaled = progress * segmentCount;
    const segmentIndex = Math.min(Math.floor(scaled), segmentCount - 1);
    const localT = scaled - segmentIndex;
    const start = points[segmentIndex];
    const end = points[segmentIndex + 1];

    packet.position.lerpVectors(start, end, localT);

    const direction = directionRef.current.subVectors(end, start).normalize();
    const trail = packet.children[1];

    if (trail) {
      const segmentLength = start.distanceTo(end);
      const availableTail = Math.max(
        CABLE_SIZE * 0.24,
        Math.min(trailLength, localT * segmentLength),
      );

      trail.position.copy(direction).multiplyScalar(-availableTail * 0.5);
      trail.scale.set(1, 1, availableTail / trailLength);

      rotationRef.current.set(0, Math.atan2(direction.x, direction.z), 0);
      trail.rotation.copy(rotationRef.current);
    }
  });

  return (
    <group ref={packetRef} position={trace.points[0]}>
      <mesh>
        <boxGeometry args={[CABLE_SIZE, CABLE_SIZE, CABLE_SIZE]} />
        <meshStandardMaterial
          color="#8b5fff"
          emissive="#8b5fff"
          emissiveIntensity={1.9}
          metalness={0.04}
          roughness={0.18}
        />
      </mesh>

      <mesh>
        <boxGeometry args={[CABLE_SIZE * 0.92, CABLE_SIZE * 0.92, trailLength]} />
        <meshStandardMaterial
          color="#8b5fff"
          emissive="#8b5fff"
          emissiveIntensity={0.55}
          transparent
          opacity={0.22}
          metalness={0.02}
          roughness={0.2}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export function CircuitLines() {
  const tScene = useTranslations("Scene");
  const sceneNodes = useMemo(() => getSceneNodes(tScene), [tScene]);
  const traces = useMemo(() => getCircuitTraces(sceneNodes), [sceneNodes]);

  return (
    <>
      {traces.map((trace, traceIndex) => (
        <group key={trace.key}>
          {trace.points.slice(0, -1).map((start, segmentIndex) => {
            const end = trace.points[segmentIndex + 1];
            const center = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
            const isXAxis = Math.abs(end.x - start.x) > Math.abs(end.z - start.z);
            const length = isXAxis
              ? Math.abs(end.x - start.x)
              : Math.abs(end.z - start.z);

            return (
              <mesh
                key={`${trace.key}-${segmentIndex}`}
                position={center}
                scale={isXAxis ? [length, CABLE_SIZE, CABLE_SIZE] : [CABLE_SIZE, CABLE_SIZE, length]}
              >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                  color="#c8d2f4"
                  emissive="#eef2ff"
                  emissiveIntensity={0.18}
                  metalness={0.04}
                  roughness={0.34}
                />
              </mesh>
            );
          })}

          {trace.points.slice(1, -1).map((point, pointIndex) => (
            <mesh key={`${trace.key}-joint-${pointIndex}`} position={point}>
              <boxGeometry args={[CABLE_SIZE, CABLE_SIZE, CABLE_SIZE]} />
              <meshStandardMaterial
                color="#c8d2f4"
                emissive="#eef2ff"
                emissiveIntensity={0.18}
                metalness={0.04}
                roughness={0.34}
              />
            </mesh>
          ))}

          <CircuitPacket trace={trace} index={traceIndex} />
          <CircuitPacket trace={trace} index={traceIndex + traces.length} />
        </group>
      ))}
    </>
  );
}
