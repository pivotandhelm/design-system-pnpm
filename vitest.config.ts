import react from "@vitejs/plugin-react";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const repositoryRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],

  test: {
    projects: [
      {
        root: resolve(repositoryRoot, "packages/tokens"),

        test: {
          name: "tokens",
          environment: "node",
          include: ["src/**/*.test.ts"]
        }
      },

      {
        root: resolve(repositoryRoot, "packages/icons"),

        test: {
          name: "icons",
          environment: "jsdom",
          setupFiles: [resolve(repositoryRoot, "vitest.setup.ts")],
          include: ["src/**/*.test.{ts,tsx}"]
        }
      },

      {
        root: resolve(repositoryRoot, "packages/ui"),

        test: {
          name: "ui",
          environment: "jsdom",
          setupFiles: [resolve(repositoryRoot, "vitest.setup.ts")],
          include: ["src/**/*.test.{ts,tsx}"]
        }
      },

      {
        extends: true,

        root: resolve(repositoryRoot, "apps/storybook"),

        plugins: [
          storybookTest({
            configDir: resolve(repositoryRoot, "apps/storybook/.storybook"),
            tags: {
              include: ["test"],
              exclude: [],
              skip: []
            }
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
