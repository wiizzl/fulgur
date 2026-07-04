# Client API

Fulgur's client is a thin wrapper around [Eden Treaty](https://elysiajs.com/eden/treaty/overview), the official type-safe client from the Elysia ecosystem. Eden Treaty reads your Elysia server types at compile time and produces a fully typed HTTP client — no code generation step, no OpenAPI schema to maintain.

## Setup

Create a client instance:

```ts
// src/lib/api.ts
import type { AppRouter } from "#router";
import { createClient } from "fulgur/client";

export const api = createClient<AppRouter>();
```

The `AppRouter` type is auto-generated from your server routes. It carries the full type information of every endpoint.

## Making requests

```ts
// GET /api/hello
const { data, error } = await api.hello.get();

// POST /api/users with body
const { data } = await api.users.post({
  name: "Alice",
});

// GET /api/users/:id
const { data } = await api.users({ id: 1 }).get();
```

## Type inference

Every response is fully typed:

```ts
const { data } = await api.hello.get();
//      ^? { message: string }

const { data } = await api.users.post({ name: "Alice" });
//      ^? { created: string }
```

TypeScript will catch invalid paths, wrong HTTP methods, and incorrect request bodies at compile time.

## Error handling

Eden Treaty returns `data` and `error` separately:

```ts
const { data, error } = await api.hello.get();

if (error) {
  console.error("Request failed:", error.status);
  return;
}

console.log(data.message);
```

## How it works

`createClient` is a small factory built on top of Eden Treaty. It creates a proxy that:

1. Maps property access to URL paths (`api.users.get()` → `GET /api/users`)
2. Serializes request bodies and query parameters
3. Deserializes JSON responses
4. Infers all types from the `AppRouter` generic — the same Elysia type from your server

In the browser, requests go to the same origin. In development, the Vite dev proxy forwards `/api` requests to the backend.

For advanced Eden Treaty usage (custom headers, interceptors, `$fetch`), refer to the [Eden Treaty docs](https://elysiajs.com/eden/treaty/overview).
