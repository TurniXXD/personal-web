import type {
  FormEventHandler,
  RefObject,
  PointerEvent as ReactPointerEvent,
  WheelEvent as ReactWheelEvent,
} from "react";

export type DialogInteractionProps = {
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onPointerDown?: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove?: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onWheelCapture: (event: ReactWheelEvent<HTMLDivElement>) => void;
};

export type BaseDialogProps = {
  dialogRef: RefObject<HTMLDivElement | null>;
  open: boolean;
  interactionProps: DialogInteractionProps;
  onClose: () => void;
};

export type ContactDialogProps = BaseDialogProps & {
  onSubmit: FormEventHandler<HTMLFormElement>;
  errors: Record<string, string>;
  status: "idle" | "submitting" | "success" | "error";
};
