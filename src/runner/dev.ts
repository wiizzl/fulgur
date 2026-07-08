import { Elysia } from "elysia";
import { resolve } from "node:path";

import { loadRoutes } from "#/utils/load-routes";
import { healthRouter } from "#/utils/health";

import { getRunnerConfig } from "#/shared/config";

const config = getRunnerConfig();
const scanRoot = resolve(config.root, config.serverDir);
const routes = await loadRoutes(scanRoot);

new Elysia().use(healthRouter).use(routes).listen(config.port);
