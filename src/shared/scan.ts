import { Glob } from "bun";
import { join } from "node:path";

const IGNORED_PREFIXES = ["node_modules/", "dist/", ".fulgur/"];

export function normalizePath(p: string): string {
  return p.replaceAll("\\", "/");
}

export function isIgnored(filePath: string): boolean {
  const normalized = normalizePath(filePath);

  return (
    IGNORED_PREFIXES.some((prefix) => normalized.startsWith(prefix)) ||
    normalized.includes("/node_modules/")
  );
}

export async function* scanServerFiles(
  root: string,
): AsyncGenerator<{ relative: string; absolute: string }> {
  const glob = new Glob("**/*.server.ts");

  for await (const relativePath of glob.scan(root)) {
    if (!isIgnored(relativePath)) {
      yield {
        relative: normalizePath(relativePath),
        absolute: join(root, normalizePath(relativePath)),
      };
    }
  }
}

export function scanServerFilesSync(
  root: string,
): { relative: string; absolute: string }[] {
  const glob = new Glob("**/*.server.ts");

  return Array.from(glob.scanSync(root))
    .map((file) => normalizePath(file))
    .filter((file) => !isIgnored(file))
    .sort((a, b) => a.localeCompare(b))
    .map((relative) => ({
      relative,
      absolute: join(root, relative),
    }));
}
