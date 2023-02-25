import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["shared-workers"],
  },
  build: {
    commonjsOptions: {
      include: [/shared-workers/, /node_modules/],
    },
  },
  plugins: [react()],
});
