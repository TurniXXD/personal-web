import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";
const webServerURL =
  process.env.PLAYWRIGHT_WEB_SERVER_URL ?? new URL("/en", baseURL).toString();
const webServerCommand =
  process.env.PLAYWRIGHT_WEB_SERVER_COMMAND ??
  (process.env.CI
    ? "pnpm exec next start -p 3000"
    : "pnpm build && pnpm exec next start -p 3000");

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  timeout: 60_000,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: webServerCommand,
    url: webServerURL,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
