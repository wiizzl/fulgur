import type { Plugin, ResolvedConfig } from "vite";

import { BackendManager, type BackendConfig } from "#/plugin/backend";
import { generateClient } from "#/plugin/generator";

import {
  API_PREFIX,
  DEFAULT_PORT,
  DEFAULT_SERVER_DIR,
} from "../shared/constants";
import { logError } from "../shared/logger";

export interface FulgurConfig {
  port?: number;
  serverDir?: string;
}

export default function fulgur(userConfig: FulgurConfig = {}): Plugin {
  const config = {
    port: userConfig.port ?? DEFAULT_PORT,
    serverDir: userConfig.serverDir ?? DEFAULT_SERVER_DIR,
  };

  const backend = new BackendManager();
  let viteConfig: ResolvedConfig;
  const cleanupFns: Array<() => void> = [];

  const getBackendConfig = (): BackendConfig => ({
    port: config.port,
    root: viteConfig.root,
    serverDir: config.serverDir,
  });

  return {
    name: "vite-plugin-fulgur",
    enforce: "pre",

    load(id) {
      const cleanId = id.split("?")[0];

      if (cleanId.endsWith(".server.ts")) {
        throw new Error(
          `Cannot import server module in client code: ${cleanId}`,
        );
      }
    },

    config() {
      return {
        server: {
          proxy: {
            [API_PREFIX]: {
              target: `http://localhost:${config.port}`,
              changeOrigin: true,
              ws: true,
              rewrite: (path) => path.replace(new RegExp(`^${API_PREFIX}`), ""),
            },
          },
        },
      };
    },

    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },

    buildStart() {
      generateClient(viteConfig.root);
    },

    async configureServer(server) {
      await backend.start(getBackendConfig());

      const onClose = () => backend.kill();
      server.httpServer?.once("close", onClose);
      cleanupFns.push(() => server.httpServer?.off("close", onClose));

      const onSigint = () => {
        backend.kill();
        process.exit();
      };
      const onSigterm = () => {
        backend.kill();
        process.exit();
      };
      process.on("SIGINT", onSigint);
      process.on("SIGTERM", onSigterm);
      cleanupFns.push(() => {
        process.off("SIGINT", onSigint);
        process.off("SIGTERM", onSigterm);
      });

      const onWatcherAll = (_: string, path: string) => {
        if (path.endsWith(".server.ts")) {
          generateClient(viteConfig.root);
          backend.debouncedRestart(getBackendConfig());
        }
      };
      server.watcher.on("all", onWatcherAll);
      cleanupFns.push(() => server.watcher.off("all", onWatcherAll));
    },

    closeBundle() {
      for (const fn of cleanupFns) {
        fn();
      }
      cleanupFns.length = 0;
      backend.kill();
    },

    configurePreviewServer() {
      logError("Preview server is disabled.");
      process.exit(0);
    },
  };
}
