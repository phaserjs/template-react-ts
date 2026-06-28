import path from "node:path";

import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import circleDependency from "vite-plugin-circular-dependency";

const ReactCompilerConfig = { target: "19" as const };

const phaserMessage = () => {
  return {
    name: "phaserMessage",
    buildStart() {
      process.stdout.write("🛠️ Building for production...\n");
    },
    buildEnd() {
      process.stdout.write("✅ Build complete!\n");
      process.stdout.write("📦 Bundling...\n");
    },
    closeBundle() {
      process.stdout.write("✅ Bundle complete!\n");
      const line = "----------------------------------------------------------";
      const msg = "❤️❤️❤️ Tell us about your game! - support@phaser.io ❤️❤️❤️";
      process.stdout.write(`\n${line}\n${msg}\n${line}\n`);
    },
  };
};

export default defineConfig({
  base: "./",
  define: {
    __DEV__: false,
  },
  plugins: [
    circleDependency(),
    react(),
    babel({
      presets: [reactCompilerPreset(ReactCompilerConfig)],
    }),
    phaserMessage(),
  ],
  logLevel: "warn",
  build: {
    chunkSizeWarningLimit: 1400, // Phaser 4 is 1.3 mB
    rolldownOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules") && id.includes("phaser")) {
            return "phaser";
          }
          if (id.includes("node_modules") && id.includes("react")) {
            return "react";
          }
          return null;
        },
      },
    },
  },
  resolve: {
    alias: {
      "#": path.resolve(import.meta.dirname, "../src"),
    },
  },
});
