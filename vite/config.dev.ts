import path from "node:path";

import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import circleDependency from "vite-plugin-circular-dependency";
import typedCssModules from "vite-plugin-typed-css-modules";

const ReactCompilerConfig = { target: "19" as const };

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  define: {
    __DEV__: true,
  },
  plugins: [
    typedCssModules(),
    circleDependency(),
    react(),
    babel({
      presets: [reactCompilerPreset(ReactCompilerConfig)],
    }),
  ],
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      "#": path.resolve(import.meta.dirname, "../src"),
    },
  },
});
