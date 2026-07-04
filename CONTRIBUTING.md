# Contributing

Thank you for your interest in contributing! This guide will help you get started.

## Prerequisites

- [Bun](https://bun.sh) installed on your system

## Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/<your-username>/fulgur.git`
3. Navigate to the project directory: `cd fulgur`
4. Install dependencies: `bun install`

## Project Structure

This is a monorepo using [Bun workspaces](https://bun.sh/docs/install/workspaces). All packages live under [`packages/`](./packages).

## Development workflow

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Format your code: `bun run format`
4. Lint your code: `bun run lint`
5. Run tests and typecheck: `bun run test && bun run typecheck`
6. Record a changeset: `bun run changeset`
7. Commit using [this convention](https://github.com/angular/angular/blob/main/contributing-docs/commit-message-guidelines.md)
8. Push your branch and open a pull request

## Releases

We use [Changesets](https://changesets.dev) to manage versioning. Each edit that needs to be released must include a changeset file describing the impact.

- Run `bun run changeset` and follow the prompts
- Commit the generated file alongside your changes
- The CI consumes changesets on merge to `main` and publishes new versions automatically

## Pull Requests

- Keep changes focused — one PR, one concern
- Update [documentation](./docs/src) if your changes affect user-facing behavior
- Make sure all checks pass
- Address review feedback

## Code of Conduct

Be respectful and constructive. We're all here to build something useful.

## Questions

Use [GitHub Discussions](https://github.com/wiizzl/fulgur/discussions) for questions and ideas.
