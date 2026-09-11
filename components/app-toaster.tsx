"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Toaster = dynamic(() => import("sonner").then((mod) => mod.Toaster), {
  ssr: false,
});

export const AppToaster = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mountWhenIdle = () => setMounted(true);
    const idleWindow = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (
      typeof idleWindow.requestIdleCallback === "function" &&
      typeof idleWindow.cancelIdleCallback === "function"
    ) {
      const idleId = idleWindow.requestIdleCallback(mountWhenIdle, {
        timeout: 3000,
      });

      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timerId = window.setTimeout(mountWhenIdle, 1800);

    return () => window.clearTimeout(timerId);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Toaster
      position="top-right"
      richColors
      toastOptions={{
        style: {
          borderRadius: "1rem",
        },
      }}
    />
  );
};
