import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base path for assets and app root. Must match deployment URL subpath.
// - GitHub Pages (project site): use repo name, e.g. /admin-ui/ or set in workflow.
// - AWS at root: use "/" (set VITE_BASE_PATH=/ when building).
const basePath =
  process.env.VITE_BASE_PATH ??
  (process.env.NODE_ENV === "production" ? "/admin-ui/" : "/");

export default defineConfig({
  base: basePath.endsWith("/") ? basePath : `${basePath}/`,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
