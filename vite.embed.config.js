import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/wheel/embed/wheelee.js",
      name: "WheeleeWidget",
      formats: ["iife"],
      fileName: () => "wheelee.min.js",
    },
    outDir: "dist-embed",
    emptyOutDir: true,
    sourcemap: false,
    // minify: "terser",
    minify: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
