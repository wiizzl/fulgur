import { Elysia } from "elysia";

import { logError, logWarning } from "#/shared/logger";
import { scanServerFiles } from "#/shared/scan";

export async function loadRoutes(root: string): Promise<Elysia> {
  const router = new Elysia();

  for await (const file of scanServerFiles(root)) {
    try {
      const mod = await import(file.absolute);

      if (!mod.fulgur) {
        logWarning(`${file.relative} does not export 'fulgur'. Skipping.`);
        continue;
      }

      if (!(mod.fulgur instanceof Elysia)) {
        logWarning(
          `${file.relative} exports 'fulgur' but it is not an Elysia instance. Skipping.`,
        );
        continue;
      }

      router.use(mod.fulgur);
    } catch (error) {
      logError(`Failed to load ${file.relative}: ${error}`);
    }
  }

  return router;
}
