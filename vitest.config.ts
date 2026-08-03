import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

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
      }
    ],
    coverage: {
      reporter: ["text", "html"]
    }
  }
});
