import { spawn, type ChildProcess } from "node:child_process";
import { join } from "node:path";

import { waitForBackend } from "#/plugin/health";

import { ENV_VARS } from "#/shared/constants";
import { log, logError, logServer } from "#/shared/logger";

const runnerPath = join(import.meta.dirname, "../runner/dev.js");

export interface BackendConfig {
  port: number;
  root: string;
  serverDir: string;
}

export class BackendManager {
  private process: ChildProcess | null = null;
  private restartTimer: ReturnType<typeof setTimeout> | null = null;

  async start(config: BackendConfig): Promise<boolean> {
    this.kill();

    log(`Starting backend on port ${config.port}...`);

    this.process = spawn("bun", ["run", runnerPath], {
      stdio: "pipe",
      detached: true,
      env: {
        ...process.env,
        [ENV_VARS.PORT]: config.port.toString(),
        [ENV_VARS.ROOT]: config.root,
        [ENV_VARS.SERVER_DIR]: config.serverDir,
      },
    });

    this.process.stdout?.on("data", logServer);
    this.process.stderr?.on("data", logServer);

    this.process.on("exit", (code, signal) => {
      if (code !== 0 && code !== null && !this.process?.killed) {
        logError(`Backend exited with code ${code} (signal: ${signal})`);
      }
    });

    const ready = await waitForBackend(config.port);

    if (ready) {
      log(`Backend ready on http://localhost:${config.port}`);
    } else {
      logError("Backend failed to start within 10 seconds");
    }

    return ready;
  }

  kill(): void {
    if (this.restartTimer) {
      clearTimeout(this.restartTimer);
      this.restartTimer = null;
    }

    if (this.process && !this.process.killed) {
      try {
        if (this.process.pid) {
          process.kill(-this.process.pid, "SIGTERM");
        }
      } catch {
        this.process.kill("SIGKILL");
      }

      this.process = null;
    }
  }

  debouncedRestart(config: BackendConfig, delay = 200): void {
    if (this.restartTimer) {
      clearTimeout(this.restartTimer);
    }

    log("Restarting backend...");

    this.restartTimer = setTimeout(() => {
      this.start(config);
    }, delay);
  }
}
