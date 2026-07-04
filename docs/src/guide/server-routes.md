# Server Routes

Server routes are the backbone of your Fulgur API. Any file ending with `.server.ts` inside `src/` is automatically discovered and mounted.

Fulgur does not invent a routing API. Every route file is a plain [Elysia](https://elysiajs.com) instance. It means you get the full Elysia API surface: validation with TypeBox, lifecycle hooks, guards, plugins, and the entire Elysia ecosystem.

## Creating a route

```ts
// src/api/users.server.ts
import { Elysia } from "fulgur/server";

export const fulgur = new Elysia().get("/users", () => {
  return [{ id: 1, name: "Alice" }];
});
```

Two rules:

1. The file must be named `*.server.ts`
2. It must export a named `fulgur` constant that is an `Elysia` instance

## Route composition

Fulgur scans all `*.server.ts` files and composes them into a single router using Elysia's `.use()`.

## Using Elysia features

`fulgur/server` is a direct re-export of `elysia`. Everything available in Elysia works here:

```ts
import { Elysia, t } from "fulgur/server";

export const fulgur = new Elysia().post(
  "/users",
  ({ body }) => {
    return { created: body.name };
  },
  {
    body: t.Object({
      name: t.String(),
    }),
  },
);
```

## Nesting routes

You can group routes using Elysia's `.group()`:

```ts
import { Elysia } from "fulgur/server";

export const fulgur = new Elysia({ prefix: "/admin" })
  .get("/stats", () => ({ users: 42 }))
  .get("/logs", () => []);
```

Routes will be available at `/api/admin/stats` and `/api/admin/logs`.

## Hot reload

In development, Fulgur watches for changes to `*.server.ts` files. When a change is detected:

1. The router is regenerated
2. The backend process is restarted
3. The Vite dev proxy continues serving requests seamlessly

No manual restart needed.
