import { defineConfig } from "@playwright/test";

// Runs against the built site (`pnpm build` first). Uses the installed Google Chrome locally;
// in CI, set PW_CHANNEL="" to use Playwright's bundled Chromium.
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  reporter: [["list"]],
  timeout: 120_000,
  use: {
    baseURL: "http://localhost:4322",
    channel: process.env.PW_CHANNEL ?? "chrome",
  },
  webServer: {
    command: "pnpm exec astro preview --port 4322",
    url: "http://localhost:4322/en/",
    reuseExistingServer: !process.env.CI,
  },
});
