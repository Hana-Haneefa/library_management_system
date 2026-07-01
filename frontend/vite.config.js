import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    hmr: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000", //my backend port
        changeOrigin: true,
      },
    },
  },
});
