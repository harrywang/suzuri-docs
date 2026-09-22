# suzuri-docs

Documentation site for [Suzuri](https://github.com/harrywang/suzuri), built with
[Fumadocs](https://fumadocs.dev) on Next.js.

## Develop

```sh
pnpm install
pnpm dev      # http://localhost:3000
```

```sh
pnpm build        # production build
pnpm types:check  # next typegen && tsc --noEmit
pnpm lint         # eslint
```

## Writing docs

Pages are MDX files under `content/docs`. The file path becomes the URL
(`content/docs/writing/citations.mdx` → `/writing/citations`), and each page's
frontmatter drives the sidebar:

```mdx
---
title: Citations
description: One sentence, also used for the OG image and llms.txt.
icon: Quote
---
```

`icon` is a [Lucide](https://lucide.dev) name in PascalCase, and it must exist
in `lucide-react`'s `icons` map — the build warns on unknown names (`Home` is
`House`, for instance).

`meta.json` in a folder sets that section's title, icon, and page order.
Ordering is explicit; new pages need to be added to the list.

Components available in MDX (`Callout`, `Cards`/`Card`, `Tabs`/`Tab`, `Steps`,
`Files`, `Accordions`, `TypeTable`, `Mermaid`) are registered in
`components/mdx.tsx`. `Card`'s `icon` prop takes JSX, not a name — import from
`lucide-react` at the top of the MDX file.

`Mermaid` draws a diagram in the browser and follows the light/dark theme. It
takes the diagram source as a `chart` prop rather than a fenced code block, so
a ```` ```mermaid ```` fence still shows as source — which is what a page about
Suzuri's own syntax usually wants:

```mdx
<Mermaid
  chart={`flowchart LR
  a --> b`}
/>
```

## Layout of the project

| Path | What it is |
| --- | --- |
| `content/docs` | The docs themselves |
| `lib/source.ts` | Content source and page tree |
| `lib/shared.ts` | Site name, URLs, GitHub coordinates |
| `lib/layout.shared.tsx` | Nav title, logo, header links |
| `app/(docs)` | Docs layout and page route, served at the site root |
| `app/global.css` | Suzuri palette and prose typography |
| `app/api/search` | Search index endpoint |
| `app/llms.txt`, `app/llms-full.txt`, `app/llms.mdx` | Machine-readable docs |
| `app/og` | Generated OG images |

Appending `.md` to any docs URL — or requesting it with an `Accept` header that
prefers markdown — returns the page's markdown source, via `proxy.ts`.

## URLs

The whole site is documentation, so docs are served at the **root**
(`/installation`, not `/docs/installation`). That is set by `docsRoute` in
`lib/shared.ts` and the `app/(docs)` route group.

Because the docs catch-all sits at the root, `proxy.ts` keeps a `RESERVED` list
of prefixes it must not rewrite (`/api`, `/og`, `/llms.txt`, `/llms-full.txt`,
`/llms.mdx`). Add to it if you add a route handler of your own.

## Deploying

Deployed on Vercel as its own project at `docs.suzuri.ai`. It is a stock
Next.js app — Vercel's defaults (`pnpm build`, no output directory override)
are correct. `siteUrl` in `lib/shared.ts` feeds `metadataBase`, so update it if
the domain changes.
