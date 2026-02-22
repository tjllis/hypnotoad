import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//https: vite.dev/config/
export default defineConfig({
  base: "/hypnotoad/",
  plugins: [react()],
  css: {
    devSourcemap: true,
  },
  build: {
    sourcemap: "hidden",
    cssCodeSplit: true,
    // minify: false,
  },
});
