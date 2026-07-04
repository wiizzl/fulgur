import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import fulgur from "fulgur/vite";

export default defineConfig({
  plugins: [fulgur(), react()],
});
