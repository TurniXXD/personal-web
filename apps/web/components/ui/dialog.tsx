"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { cn } from "cn";

const Dialog = DialogPrimitive.Root;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;
const DialogClose = DialogPrimitive.Close;

type DialogContentProps = React.ComponentProps<
  typeof DialogPrimitive.Content
> & {
  closeLabel: string;
};

function DialogContent({
  className,
  children,
  closeLabel,
  ...props
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        data-slot="dialog-overlay"
        className="fixed inset-0 z-[1100] bg-[#141a3a]/45 backdrop-blur-[3px] data-[state=closed]:animate-[dialog-fade-out_150ms_ease-in] data-[state=open]:animate-[dialog-fade-in_180ms_ease-out] motion-reduce:animate-none"
      />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed inset-x-0 bottom-0 z-[1100] grid max-h-[92dvh] gap-4 overflow-y-auto rounded-t-[1.5rem] border border-border-card bg-card p-5 shadow-[0_-20px_60px_rgba(20,26,58,0.22)] focus:outline-none data-[state=closed]:animate-[dialog-fade-out_150ms_ease-in] data-[state=open]:animate-[dialog-fade-in_200ms_ease-out] motion-reduce:animate-none sm:inset-auto sm:top-1/2 sm:left-1/2 sm:w-[min(100%-2rem,28rem)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[1.5rem] sm:p-6",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          aria-label={closeLabel}
          className="absolute top-4 right-4 grid cursor-pointer size-10 place-items-center rounded-full text-ink-muted transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40]"
        >
          <X size={18} aria-hidden="true" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle };
