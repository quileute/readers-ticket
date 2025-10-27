import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    include: [
      "app/**/*.{test,spec}.{ts,tsx}",
      "components/**/*.{test,spec}.{ts,tsx}",
      "utils/**/*.{test,spec}.{ts,tsx}",
      "store/**/*.{test,spec}.{ts,tsx}",
    ],
    exclude: [
      "node_modules",
      "e2e",
      ".next",
      "dist",
      "out",
      "**/*.config.{ts,js,mjs,cjs}",
    ],
  },
});
