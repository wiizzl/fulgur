import { staticPlugin } from "@elysia/static";
import { file } from "bun";
import { Elysia } from "elysia";
import { join, resolve } from "node:path";

import { healthRouter } from "#/utils/health";
import { loadRoutes } from "#/utils/load-routes";

import type { RunnerConfig } from "#/shared/config";
import { API_PREFIX } from "#/shared/constants";
import { log } from "#/shared/logger";

/** Starts the production server: serves static assets and mounts the API. */
export async function start(config: RunnerConfig): Promise<void> {
  const distPath = join(config.root, "dist");
  const scanRoot = resolve(config.root, config.serverDir);
  const apiRouter = await loadRoutes(scanRoot);

  const app = new Elysia()
    .use(staticPlugin({ assets: distPath, prefix: "/" }))
    .group(API_PREFIX, (app) => app.use(healthRouter).use(apiRouter))
    .onError(({ code, request }) => {
      if (
        code === "NOT_FOUND" &&
        !new URL(request.url).pathname.startsWith(API_PREFIX)
      ) {
        return file(join(distPath, "index.html"));
      }
    })
    .listen(config.port);

  log(`Server running on ${app.server?.url}`);
}
