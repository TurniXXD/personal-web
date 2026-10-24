import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_WEB_BASE_URL ?? "http://127.0.0.1:3001";
const webServerCommand =
  process.env.PLAYWRIGHT_WEB_SITE_SERVER_COMMAND ??
  (process.env.CI
    ? "pnpm exec next start -p 3001"
    : "pnpm build && pnpm exec next start -p 3001");
const skipWebServer = process.env.PLAYWRIGHT_SKIP_WEB_SERVER === "true";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    launchOptions: process.env.PLAYWRIGHT_BROWSER_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_BROWSER_EXECUTABLE_PATH }
      : undefined,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: skipWebServer
    ? undefined
    : {
        command: webServerCommand,
        url: `${baseURL}/en`,
        reuseExistingServer: !process.env.CI,
        timeout: 240_000,
      },
  projects: [
    {
      name: "chromium",
      testIgnore: /webkit\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "webkit",
      testMatch: /webkit\.spec\.ts/,
      use: { ...devices["iPhone 13"] },
    },
  ],
});
