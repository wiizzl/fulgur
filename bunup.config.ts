import { defineConfig } from "bunup";

export default defineConfig({
  name: "fulgur",
  entry: [
    "src/server.ts",
    "src/client.ts",
    "src/plugin/index.ts",
    "src/runner/prod.ts",
    "src/runner/vercel.ts",
    "src/runner/dev.ts",
  ],
  dts: {
    inferTypes: true,
    resolve: false,
  },
  target: "bun",
  minify: true,
});
