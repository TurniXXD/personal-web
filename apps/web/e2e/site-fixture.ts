import { test as base } from "@playwright/test";

export const test = base.extend<{ siteSetup: void }>({
  siteSetup: [
    async ({ context }, use) => {
      await context.addInitScript(() => {
        localStorage.setItem(
          "vantuch_cookie_consent_v1",
          JSON.stringify({
            choice: "rejected",
            savedAt: Date.now(),
          }),
        );
        Object.assign(window, {
          turnstile: {
            render: (
              _container: HTMLElement,
              options: { callback: (token: string) => void },
            ) => {
              queueMicrotask(() => options.callback("test-turnstile-token"));
              return "test-turnstile-widget";
            },
            reset: () => undefined,
            remove: () => undefined,
          },
        });
      });
      await use();
    },
    { auto: true },
  ],
});
