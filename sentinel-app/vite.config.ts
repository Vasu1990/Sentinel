import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set the base path for correct asset loading in Electron
  base: './',
  server: {
    port: 5173, // Aligned with the port in your package.json dev script
    strictPort: true,
  },
});
