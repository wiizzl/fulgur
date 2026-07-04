# Configuration

Fulgur is designed to work with zero configuration. When you need to customize behavior, options are available at two levels.

## Vite plugin options

Pass options to the `fulgur()` plugin in `vite.config.ts`:

```ts
import fulgur from "fulgur/vite";

export default defineConfig({
  plugins: [
    fulgur({
      port: 3000,
      serverDir: ".",
    }),
  ],
});
```

| Option      | Type     | Default | Description                                                         |
| ----------- | -------- | ------- | ------------------------------------------------------------------- |
| `port`      | `number` | `3000`  | Port for the backend server                                         |
| `serverDir` | `string` | `"."`   | Directory to scan for `*.server.ts` files, relative to project root |

## Environment variables

These can be set to override runtime behavior:

| Variable            | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `FULGUR_ROOT`       | Project root directory (auto-set by `.fulgur/start.ts`) |
| `FULGUR_PORT`       | Override the backend port                               |
| `FULGUR_SERVER_DIR` | Override the server scan directory                      |

## Vite dev proxy

Fulgur automatically configures a Vite dev proxy that forwards `/api` requests to the backend. This is handled transparently — no configuration needed.

```
Browser → localhost:5173/api/hello → Vite proxy → localhost:3000/hello
```

## Server file protection

Fulgur's Vite plugin blocks any import of `*.server.ts` files from client code during development:

```ts
import { something } from "./api/hello.server";
// Error: Cannot import server module in client code
```

This prevents accidentally bundling server code into your client.
