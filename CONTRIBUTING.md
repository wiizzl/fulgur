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

The source code lives in [`src/`](./src). Documentation is in [`docs/`](./docs) as a standalone VitePress project.

## Development workflow

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Format your code: `bun run format`
4. Lint your code: `bun run lint`
5. Run tests and typecheck: `bun run test && bun run typecheck`
6. Commit using [this convention](https://github.com/angular/angular/blob/main/contributing-docs/commit-message-guidelines.md)
7. Push your branch and open a pull request

## Releases

Releases are triggered by pushing a `v*` tag. The CI builds the package and publishes to npm automatically.

## Pull Requests

- Keep changes focused — one PR, one concern
- Update [documentation](./docs/src) if your changes affect user-facing behavior
- Make sure all checks pass
- Address review feedback

## Code of Conduct

Be respectful and constructive. We're all here to build something useful.

## Questions

Use [GitHub Discussions](https://github.com/wiizzl/fulgur/discussions) for questions and ideas.
