import { Elysia, type AnyElysia } from "elysia";
import { resolve } from "node:path";

import { loadRoutes } from "#/utils/load-routes";

import type { RunnerConfig } from "#/shared/config";
import { API_PREFIX } from "#/shared/constants";

/** Creates the Elysia app for Vercel serverless functions. */
export async function createApp(config: RunnerConfig): Promise<AnyElysia> {
  const scanRoot = resolve(config.root, config.serverDir);
  const apiRouter = await loadRoutes(scanRoot);

  return new Elysia().group(API_PREFIX, (app) => app.use(apiRouter));
}
