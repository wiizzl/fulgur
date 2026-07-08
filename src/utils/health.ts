import { Elysia, type AnyElysia } from "elysia";

import { HEALTH_PATH } from "#/shared/constants";

export const healthRouter: AnyElysia = new Elysia().get(HEALTH_PATH, () => ({
  status: "ok",
  timestamp: Date.now(),
}));
