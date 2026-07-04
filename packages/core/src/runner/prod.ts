import { staticPlugin } from "@elysia/static";
import { file } from "bun";
import { Elysia } from "elysia";
import { join, resolve } from "node:path";

import { loadRoutes } from "#/utils/load-routes";
import { healthRouter } from "#/utils/health";

import { getRunnerConfig } from "#/shared/config";
import { API_PREFIX } from "#/shared/constants";
import { log } from "#/shared/logger";

const config = getRunnerConfig();
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
