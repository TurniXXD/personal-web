import { useFrame, useThree } from "@react-three/fiber";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import * as THREE from "three";
import type { SectionId } from "@/lib/site-data";
import { getSceneNodes } from "@/components/pipeline/config";
import type { DialogRef, DialogVisibilityState } from "@/components/pipeline/types";

type WorkDialogAnchorProps = DialogVisibilityState & {
  section: SectionId;
  dialogRef: DialogRef;
};

export function WorkDialogAnchor({
  section,
  openDialogSection,
  dialogRef,
}: WorkDialogAnchorProps) {
  const tScene = useTranslations("Scene");
  const { camera, size } = useThree();
  const sceneNodes = useMemo(() => getSceneNodes(tScene), [tScene]);
  const sceneNode = useMemo(
    () => sceneNodes.find((node) => node.id === section) ?? sceneNodes[0],
    [sceneNodes, section],
  );
  const worldAnchor = useMemo(
    () => new THREE.Vector3(sceneNode.position[0], sceneNode.position[1] + 3.1, sceneNode.position[2]),
    [sceneNode],
  );

  useFrame(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (openDialogSection !== section) {
      dialog.style.opacity = "0";
      dialog.style.pointerEvents = "none";
      return;
    }

    const projected = worldAnchor.clone().project(camera);
    const x = ((projected.x + 1) * 0.5) * size.width;
    const y = ((1 - projected.y) * 0.5) * size.height;
    const visible = projected.z > -1 && projected.z < 1;
    const { width, height } = dialog.getBoundingClientRect();
    const margin = 16;
    const clampedX = THREE.MathUtils.clamp(
      x,
      width * 0.5 + margin,
      size.width - width * 0.5 - margin,
    );
    const clampedY = THREE.MathUtils.clamp(y, height + margin, size.height - margin);

    dialog.style.opacity = visible ? "1" : "0";
    dialog.style.pointerEvents = visible ? "auto" : "none";
    dialog.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0) translate(-50%, -100%)`;
  });

  return null;
}
