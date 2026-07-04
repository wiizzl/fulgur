# Fulgur

<div>
  <a href="https://npmjs.com/package/fulgur">
    <img src="https://img.shields.io/npm/dm/fulgur.svg" alt="Downloads" />
  </a>
  <a href="https://github.com/wiizzl/fulgur/stargazers">
    <img src="https://img.shields.io/github/stars/wiizzl/fulgur" alt="Stars" />
  </a>
</div>

Vite-native fullstack integration layer powered by [Bun](https://bun.sh), [Vite](https://vite.dev) and [Elysia](https://elysiajs.com).

## What is it?

Fulgur is not a framework — it's a glue layer between three proven tools:

- [Elysia](https://elysiajs.com) — the server. Every route is a standard Elysia instance with full access to its validation, hooks, guards and plugin ecosystem.
- [Eden Treaty](https://elysiajs.com/eden/treaty/overview) — the client. Types flow from server to client with zero codegen, zero schemas, zero drift.
- [Vite](https://vite.dev) — the dev server and build tool. Fulgur is a single Vite plugin that auto-discovers routes, proxies requests in dev, and serves static files in production.

Everything runs on [Bun](https://bun.sh) for fast startups and low overhead.

## Why?

I got tired of spinning up a monorepo just to get Eden Treaty's type safety. For small projects it meant two `package.json`, two `tsconfig`, a shared types package, a build step... before even writing a single route. Fulgur removes all that friction: one project, one config, zero ceremony.

## Documentation

Head to [wiizzl.github.io/fulgur](https://wiizzl.github.io/fulgur) for the full guide.

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE)
