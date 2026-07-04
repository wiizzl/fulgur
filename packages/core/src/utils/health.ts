import { Elysia } from "elysia";

import { HEALTH_PATH } from "#/shared/constants";

export const healthRouter = new Elysia().get(HEALTH_PATH, () => ({
  status: "ok",
  timestamp: Date.now(),
}));
