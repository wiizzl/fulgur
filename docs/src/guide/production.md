# Production

## Building

```sh
bun run build
```

This runs `vite build`, which:

1. Generates the `.fulgur/router.ts`, `.fulgur/start.ts`, and `.fulgur/vercel.ts` files.
2. Builds your client bundle.

## Two runners

Fulgur provides two production runners depending on your deployment target:

| Runner     | Import          | Use case                          |
| ---------- | --------------- | --------------------------------- |
| Standalone | `fulgur/start`  | Docker, VPS, Railway, Fly.io, ... |
| Vercel     | `fulgur/vercel` | Vercel serverless functions       |

The standalone runner serves static files and includes a health check endpoint. The Vercel runner is lighter. It handles static files via its CDN and doesn't need health checks.

## Standalone runner

```sh
bun run start
```

This executes `.fulgur/start.ts`, which starts the production server. The standalone runner:

- Serves static files.
- Mounts all API routes under `/api`.
- Falls back to `index.html` for non-API routes (SPA support).
- Includes a health check endpoint at `/_fulgur/health` (useful for Docker/K8s health checks).

### Environment variables

| Variable            | Default       | Description                |
| ------------------- | ------------- | -------------------------- |
| `FULGUR_PORT`       | `3000`        | Server port                |
| `FULGUR_ROOT`       | auto-detected | Project root               |
| `FULGUR_SERVER_DIR` | `"."`         | Server file scan directory |

### Docker

```dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

EXPOSE 3000
CMD ["bun", ".fulgur/start.ts"]
```

### Any host

Since Fulgur runs as a standard Bun process, it works anywhere you can run `bun`.

Just run `bun install && bun run build && bun .fulgur/start.ts`.

## Vercel runner

The Vercel runner is optimized for serverless. It exports the Elysia instance as a default export, which Vercel wraps in a serverless function. Static files are served by Vercel's CDN, not by Elysia.

Create an `api/index.ts` file at your project root:

```ts
// api/index.ts
import app from "../.fulgur/vercel";

export default app;
```

This file imports the generated Vercel runner and re-exports it. Vercel will automatically detect this as a serverless function.

Add a `vercel.json` at your project root:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "bunVersion": "1.x",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

The `bunVersion` field [tells Vercel to use the Bun runtime](https://vercel.com/docs/functions/runtimes/bun) instead of Node.js. The rewrites route API requests to your Elysia function and everything else to `index.html` (SPA fallback).
