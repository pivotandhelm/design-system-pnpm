import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { resolve } from "node:path";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
const root = import.meta.dirname;
export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        root: resolve(root, "packages/tokens"),
        test: {
          name: "tokens",
          environment: "node",
          include: ["src/**/*.test.ts"]
        }
      },
      {
        root: resolve(root, "packages/icons"),
        test: {
          name: "icons",
          environment: "jsdom",
          setupFiles: [resolve(root, "vitest.setup.ts")],
          include: ["src/**/*.test.{ts,tsx}"]
        }
      },
      {
        root: resolve(root, "packages/ui"),
        test: {
          name: "ui",
          environment: "jsdom",
          setupFiles: [resolve(root, "vitest.setup.ts")],
          include: ["src/**/*.test.{ts,tsx}"]
        }
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, "apps/storybook/.storybook")
          })
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium"
              }
            ]
          }
        }
      }
    ],
    coverage: {
      reporter: ["text", "html"]
    }
  }
});
