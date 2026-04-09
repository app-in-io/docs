# app-in-docs

Public API documentation for App-in.io. VitePress + vitepress-openapi. Deployed to Cloudflare Pages.

> **Layout:** This site lives at `api/docs/` as a subdirectory of the main API project. It has its own `.git`, CI/CD, and GitHub repo (`app-in-io/docs`). The parent API repo's `knowledge/` directory is for internal developer docs — this site is for external API consumers.

## CRITICAL RULES

**DO NOT** commit or push without explicit permission from the user.

**DO NOT** push directly to `main`.

**The OpenAPI spec (`public/openapi.json`) is manually maintained** — keep it in sync with the actual API. When the API changes endpoints, parameters, or responses, update the spec.

## Purpose

Public-facing documentation site at `docs.app-in.io`:
- **Guide pages** — getting started, authentication, chat widget integration
- **API Reference** — auto-generated from OpenAPI spec via vitepress-openapi
- **Superpowers** — internal plans and specs (not in nav, direct links only)

## Structure

```
index.md                        ← Home page
guide/
  index.md                      ← Introduction
  quick-start.md                ← 5-minute setup (get key, index, search)
  authentication.md             ← API keys, rate limits, BYOK
  chat-widget.md                ← Web Component integration
operations/
  [operationId].md              ← Auto-generated from OpenAPI spec
public/
  openapi.json                  ← OpenAPI 3.x spec (MANUALLY maintained)
superpowers/
  plans/                        ← Feature plans (internal)
  specs/                        ← Design specs (internal)
.vitepress/
  config.ts                     ← VitePress config + sidebar + openapi integration
  theme/index.ts                ← Custom theme with OAOperation component
wrangler.toml                   ← Cloudflare Pages deploy config
```

## Commands

```bash
npm run dev       # local dev server
npm run build     # production build
npm run preview   # preview production build
```

## Deploy

Push to `main` → Cloudflare Pages auto-deploy (configured via `wrangler.toml`).

## Rules

- Operation pages under `operations/` are auto-generated from the OpenAPI spec — do not edit them manually
- Guide pages use standard VitePress Markdown — no custom components needed
- Keep content concise and focused on external developers
- Internal developer documentation stays in `knowledge/` in the parent API project
