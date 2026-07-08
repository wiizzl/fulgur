import { DEFAULT_SERVER_DIR, ENV_VARS } from "#/shared/constants";
import { logError } from "#/shared/logger";

export interface RunnerConfig {
  root: string;
  port: number;
  serverDir: string;
}

export function getRunnerConfig(): RunnerConfig {
  const root = process.env[ENV_VARS.ROOT];
  const port = process.env[ENV_VARS.PORT];

  if (!root || !port) {
    logError("FULGUR_ROOT and FULGUR_PORT must be set.");
    process.exit(1);
  }

  return {
    root,
    port: Number(port),
    serverDir: process.env[ENV_VARS.SERVER_DIR] ?? DEFAULT_SERVER_DIR,
  };
}
