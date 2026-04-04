import type { FormEventHandler, RefObject } from "react";

export type DialogInteractionProps = {
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onWheelCapture: (event: React.WheelEvent<HTMLDivElement>) => void;
};

export type BaseDialogProps = {
  dialogRef: RefObject<HTMLDivElement | null>;
  open: boolean;
  interactionProps: DialogInteractionProps;
};

export type ContactDialogProps = BaseDialogProps & {
  onSubmit: FormEventHandler<HTMLFormElement>;
  errors: Record<string, string>;
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};
