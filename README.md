# FOLD

FOLD is an editorial concept for a more personal, considered approach to
getting dressed. This responsive React experience introduces a style journey,
personal preferences, outfit recommendations, wardrobe-aware styling, and
privacy principles.

The current project is a front-end prototype: its profile, filters, save
controls, and recommendations are illustrative and are not connected to an
account, API, or persistence layer.

## Getting started

### Requirements

- Node.js 22
- pnpm 10.34.3

The repository includes a `.mise.toml` with these tool versions. You can also
install pnpm directly with `npm install --global pnpm@10.34.3`.

### Install and run

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Vite prints the local development URL in the terminal when the server starts.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Vite development server with hot reload. |
| `pnpm build` | Create a production build in `dist/`. |
| `pnpm preview` | Serve the production build locally. Run `pnpm build` first. |
| `pnpm format` | Format the project with oxfmt. |

Useful checks before submitting changes:

```sh
pnpm exec tsc --noEmit
pnpm exec oxfmt --check src/App.tsx src/index.css src/main.tsx
pnpm build
```

## Project structure

- `src/App.tsx` — page sections, content, and scroll-driven effects.
- `src/index.css` — global styles, layout, responsive rules, and motion.
- `src/assets/` — editorial photography and interface icons.
- `src/main.tsx` — React entry point.
- `index.html` — Vite HTML shell.
- `vite.config.ts` — Vite, React, Tailwind CSS, and Figma Make configuration.

The interface is styled with Tailwind CSS v4 and custom CSS. There is no
backend or automated test suite configured yet.
