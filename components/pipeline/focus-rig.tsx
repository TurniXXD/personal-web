import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTranslations } from "next-intl";
import * as THREE from "three";
import type { SectionId } from "@/lib/site-data";
import { fixedCameraOffset, getSceneNodes } from "@/components/pipeline/config";
import type { TargetPanRef } from "@/components/pipeline/types";

type FocusRigProps = {
  activeSection: SectionId | null;
  targetPan: TargetPanRef;
  zoom: number;
  maxZoom: number;
  viewResetToken: number;
};

export function FocusRig({
  activeSection,
  targetPan,
  zoom,
  maxZoom,
  viewResetToken,
}: FocusRigProps) {
  const tScene = useTranslations("Scene");
  const { size } = useThree();
  const sceneNodes = useMemo(() => getSceneNodes(tScene), [tScene]);
  const activeNode = useMemo(
    () => sceneNodes.find((node) => node.id === activeSection) ?? sceneNodes[0],
    [activeSection, sceneNodes],
  );
  const overviewTarget = useMemo(() => {
    const center = sceneNodes.reduce(
      (acc, node) => {
        acc.x += node.position[0];
        acc.y += node.position[1];
        acc.z += node.position[2];
        return acc;
      },
      { x: 0, y: 0, z: 0 },
    );

    return new THREE.Vector3(
      center.x / sceneNodes.length,
      center.y / sceneNodes.length + 1.2,
      center.z / sceneNodes.length - 0.8,
    );
  }, [sceneNodes]);
  const initialized = useRef(false);
  const target = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3());
  const desiredLookAt = useRef(new THREE.Vector3());
  const currentCameraPosition = useRef(new THREE.Vector3());
  const desiredCameraPosition = useRef(new THREE.Vector3());
  const currentPan = useRef({ x: 0, z: 0 });

  useEffect(() => {
    const [x, y, z] = activeNode.position;
    targetPan.current = { x: 0, z: 0 };
    target.current.set(x, y, z);
    desiredLookAt.current.copy(target.current);
    desiredCameraPosition.current
      .copy(target.current)
      .add(fixedCameraOffset.clone().multiplyScalar(zoom));

    if (!initialized.current) {
      currentPan.current = { x: 0, z: 0 };
      currentLookAt.current.copy(target.current);
      currentCameraPosition.current.copy(desiredCameraPosition.current);
      initialized.current = true;
    }
  }, [activeNode, targetPan, zoom]);

  useEffect(() => {
    targetPan.current = { x: 0, z: 0 };
    target.current.copy(overviewTarget);
    desiredLookAt.current.copy(overviewTarget);
    const overviewMultiplier =
      typeof window !== "undefined" && window.innerWidth > 1024 ? 1.08 : 1.24;

    desiredCameraPosition.current.copy(
      overviewTarget
        .clone()
        .add(fixedCameraOffset.clone().multiplyScalar(maxZoom * overviewMultiplier)),
    );
  }, [maxZoom, overviewTarget, targetPan, viewResetToken]);

  useFrame(({ camera }, delta) => {
    const isCompactViewport = size.width <= 1024;
    const smoothing = 1 - Math.exp(-delta * 1.7);
    const panSmoothing = 1 - Math.exp(-delta * 2.1);
    const focusLift = isCompactViewport ? 3.2 : 0.35;
    const overviewMode = zoom >= maxZoom - 0.02;

    currentPan.current.x = THREE.MathUtils.lerp(
      currentPan.current.x,
      targetPan.current.x,
      panSmoothing,
    );
    currentPan.current.z = THREE.MathUtils.lerp(
      currentPan.current.z,
      targetPan.current.z,
      panSmoothing,
    );

    const [x, y, z] = activeNode.position;
    if (overviewMode) {
      target.current.copy(overviewTarget);
    } else {
      target.current.set(x + currentPan.current.x, y + focusLift, z + currentPan.current.z);
    }
    desiredLookAt.current.copy(target.current);
    desiredCameraPosition.current.copy(target.current).add(
      fixedCameraOffset.clone().multiplyScalar(
        overviewMode ? zoom * (isCompactViewport ? 1.24 : 1.08) : zoom,
      ),
    );

    currentLookAt.current.lerp(desiredLookAt.current, smoothing);
    currentCameraPosition.current.lerp(desiredCameraPosition.current, smoothing);
    camera.position.copy(currentCameraPosition.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
