import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { scanServerFilesSync } from "#/shared/scan";

const FULGUR_EXPORT_REGEX = /^\s*export\s+(const|let|var)\s+fulgur\s*=/m;

function ensureDir(path: string) {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

export function toSafeName(filePath: string): string {
  const base = filePath.replace(/[^\w]/g, "_").replace(/^_+|_+$/g, "");
  const hash = createHash("sha1").update(filePath).digest("hex").slice(0, 8);
  const candidate = base ? `${base}_${hash}` : `route_${hash}`;

  return /^\d/.test(candidate) ? `_${candidate}` : candidate;
}

export function hasFulgurExport(absolutePath: string): boolean {
  try {
    const content = readFileSync(absolutePath, "utf-8");

    return FULGUR_EXPORT_REGEX.test(content);
  } catch {
    return false;
  }
}

export function generateClient(
  root: string,
  port: number,
  serverDir: string,
): void {
  const pluginDir = resolve(root, ".fulgur");
  ensureDir(pluginDir);

  const serverFiles = scanServerFilesSync(root);
  const routeFiles = serverFiles.filter((f) => hasFulgurExport(f.absolute));

  const importsCode = routeFiles
    .map((file) => {
      const safeName = toSafeName(file.relative);
      const importPath = file.relative.replace(/\.ts$/, "");
      return `import { fulgur as ${safeName} } from "../${importPath}";`;
    })
    .join("\n");

  const useCode = routeFiles
    .map((file) => `  .use(${toSafeName(file.relative)})`)
    .join("\n");

  const routerTemplate = `import { Elysia } from "fulgur/server";
${importsCode}
export const appRouter = new Elysia()
${useCode};
export type AppRouter = typeof appRouter;
`;

  writeFileSync(join(pluginDir, "router.ts"), routerTemplate);

  const startTemplate = `import { join } from "node:path";
import { start } from "fulgur/start";

await start({
  root: join(import.meta.dir, ".."),
  port: ${port},
  serverDir: ${JSON.stringify(serverDir)},
});
`;

  writeFileSync(join(pluginDir, "start.ts"), startTemplate);

  const vercelTemplate = `import { join } from "node:path";
import { createApp } from "fulgur/vercel";

export default await createApp({
  root: join(import.meta.dir, ".."),
  port: ${port},
  serverDir: ${JSON.stringify(serverDir)},
});
`;

  writeFileSync(join(pluginDir, "vercel.ts"), vercelTemplate);
}
