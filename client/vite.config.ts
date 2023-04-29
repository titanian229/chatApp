import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3003",
        changeOrigin: true,
        secure: false,
      },
      "/ws": {
        target: "ws://localhost:3003",
        ws: true,
      },
    },
  },
  plugins: [react()],
});
