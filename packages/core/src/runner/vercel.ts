import { Elysia } from "elysia";
import { resolve } from "node:path";

import { loadRoutes } from "#/utils/load-routes";

import { getRunnerConfig } from "#/shared/config";
import { API_PREFIX } from "#/shared/constants";

const config = getRunnerConfig();
const scanRoot = resolve(config.root, config.serverDir);
const apiRouter = await loadRoutes(scanRoot);

const app = new Elysia().group(API_PREFIX, (app) => app.use(apiRouter));

export default app;
