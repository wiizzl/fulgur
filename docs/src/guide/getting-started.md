# Getting Started

## Prerequisites

- [Bun](https://bun.sh)

## Under the hood

Fulgur is not a framework — it's a glue layer between three proven tools:

- [Elysia](https://elysiajs.com) — the server. Every route you write is a standard Elysia instance with full access to its validation, hooks, guards and plugin ecosystem.
- [Eden Treaty](https://elysiajs.com/eden/treaty/overview) — the client. Eden Treaty reads your Elysia types and generates a fully type-safe HTTP client at compile time. No code generation step, no OpenAPI spec to maintain.
- [Vite](https://vite.dev) — the dev server and build tool. Fulgur is a single Vite plugin that auto-discovers server files, composes routes, proxies requests in dev, and serves static files in production.

## Create a new project

The fastest way to get started:

```sh
bunx degit wiizzl/fulgur/examples/react-hello-world my-app
cd my-app
bun install
bun run dev
```

## Your first server route

Create `src/api/hello.server.ts`:

```ts
import { Elysia } from "fulgur/server";

export const fulgur = new Elysia().get("/hello", () => {
  return { message: "Hello World!" };
});
```

## Call it from the client

Create `src/lib/api.ts`:

```ts
import type { AppRouter } from "#router";
import { createClient } from "fulgur/client";

export const api = createClient<AppRouter>();
```

Use it in any component:

```tsx
import { api } from "./lib/api";

const { data } = await api.hello.get();
// data.message → "Hello World!"
```

That's it. Types flow from server to client automatically.
