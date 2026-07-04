# Project Structure

A typical Fulgur project looks like this:

```
my-app/
├── .fulgur/
│   ├── router.ts             # Composed server router + AppRouter type
│   └── start.ts              # Production entry point
├── src/
│   ├── api/
│   │   └── hello.server.ts   # Server route
│   ├── lib/
│   │   └── api.ts            # Type-safe client
│   ├── App.tsx               # React component
│   └── main.tsx              # Client entry
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.client.json
└── tsconfig.server.json
```

## Key directories

### `src/`

Your application code. Client and server files live side by side.

### `src/**/*.server.ts`

Any file ending with `.server.ts` is treated as a server route. Fulgur scans these automatically at startup and on file changes.

::: warning
Server files cannot be imported in client code. Fulgur will throw an error if you try.
:::

### `.fulgur/`

Auto-generated directory containing:

- **`router.ts`** — Composes all `*.server.ts` exports into a single `appRouter` and exports the `AppRouter` type.
- **`start.ts`** — Production entry point that sets `FULGUR_ROOT` and imports the production runner.

::: info
This directory is gitignored. It is regenerated on every dev start and build.
:::

## TypeScript configuration

Fulgur uses a split tsconfig setup with project references:

| File                   | Purpose                                                         |
| ---------------------- | --------------------------------------------------------------- |
| `tsconfig.json`        | Root config with references                                     |
| `tsconfig.client.json` | Client types — includes `src/`, excludes `*.server.ts`          |
| `tsconfig.server.json` | Server types — includes only `*.server.ts` and `vite.config.ts` |

This ensures server-only code never leaks into your client bundle types.

## The `#router` import alias

Your `package.json` includes an import map entry:

```json
{
  "imports": {
    "#router": "./.fulgur/router.ts"
  }
}
```

This lets you import the generated `AppRouter` type from anywhere:

```ts
import type { AppRouter } from "#router";
```
