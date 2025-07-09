import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});