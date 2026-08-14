import type { StorybookConfig } from "@storybook/react-vite";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Resolves the absolute path of an installed package.
 *
 * This supports monorepos and package-manager environments where Storybook
 * cannot safely assume that an addon is installed at a conventional path.
 */
function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
  stories: ["../../../packages/ui/src/**/*.stories.tsx"],

  addons: [
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-vitest"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-mcp")
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {}
  }
};

export default config;
