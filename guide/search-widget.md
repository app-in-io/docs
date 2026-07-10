# Search Widget

Add an instant AI search modal to any website with a single script tag. The search widget is a Web Component (`<semantic-search>`) that runs in Shadow DOM — no CSS conflicts with your site. It attaches to your existing search input and returns semantic, typo-tolerant results as the user types.

::: tip Using WooCommerce?
The [WooCommerce plugin](/guide/woocommerce-plugin) embeds and configures this widget for you automatically. Use this page for custom (non-WooCommerce) integrations or advanced configuration.
:::

## Installation

### Option 1: JS Config (recommended)

```html
<script>
window.AppInSearch = {
  apiKey: 'pk_live_your_public_key',
};
</script>
<script type="module" src="https://cdn.app-in.io/v1/search.js" async></script>
```

### Option 2: HTML Tag

```html
<script type="module" src="https://cdn.app-in.io/v1/search.js"></script>
<semantic-search api-key="pk_live_your_public_key"></semantic-search>
```

Use your **public** key (`pk_live_...`) — it's safe to expose in the browser. Find it in the [dashboard](https://my.app-in.io) under **Site → API Keys**.

::: tip Which option to choose?
**JS Config** — easier to manage, exposes programmatic control (`open()`, `close()`).
**HTML Tag** — declarative, good for static HTML or a CMS template.
:::

## Configuration

### JS Config options

```javascript
window.AppInSearch = {
  apiKey: 'pk_live_...',        // required — public key
  apiUrl: 'https://api.app-in.io/v1', // API base URL (default shown)
  platform: 'woocommerce',      // backend platform → X-Platform header (default: none)
  categoryId: '42',             // scope results to a category (sent as category_id)
  placeholder: 'Search products…', // input placeholder (default: localized)
  showAllUrl: '/search?q={query}', // "Show all results" link; {query} is replaced
  inputSelector: '.my-search',  // CSS selector of your search input(s)
  lang: 'en',                   // language for UI strings (default: auto-detect)
  theme: 'light',               // light (default) | dark
  limit: 6,                     // max results in the dropdown (default 6)
};
```

### HTML attributes

```html
<semantic-search
  api-key="pk_live_..."
  api-url="https://api.app-in.io/v1"
  platform="woocommerce"
  category-id="42"
  placeholder="Search products…"
  show-all-url="/search?q={query}"
  input-selector=".my-search"
  lang="en"
  theme="dark"
  limit="8"
></semantic-search>
```

| Attribute | Config key | Default | Description |
|---|---|---|---|
| `api-key` | `apiKey` | — | **Required.** Public key (`pk_live_...`) |
| `api-url` | `apiUrl` | `https://api.app-in.io/v1` | API base URL |
| `platform` | `platform` | — | Backend platform, sent as the `X-Platform` header (e.g. `woocommerce`) |
| `category-id` | `categoryId` | — | Scope results to a category (sent as numeric `category_id`) |
| `placeholder` | `placeholder` | localized | Search input placeholder; falls back to a `lang`-localized default |
| `show-all-url` | `showAllUrl` | `/?s={query}` | "Show all results" link; `{query}` is replaced with the URL-encoded input |
| `input-selector` | `inputSelector` | — | CSS selector of the search input(s) to attach to (added to the built-in defaults) |
| `lang` | `lang` | auto-detected | UI language (`en`, `de`, `fr`, `es`, `it`, `nl`, `pl`, `cs`, `uk`, `ru`, `et`, `pt`) |
| `theme` | `theme` | `light` | `light` or `dark` |
| `limit` | `limit` | `6` | Maximum results shown in the dropdown |

::: tip Input detection
The widget attaches to common search inputs automatically. If your theme uses a custom field, pass its `input-selector` — it's added to the built-in selectors, not replacing them.
:::

## Theming

Set `theme="dark"` for a dark modal, or fine-tune colors with CSS custom properties. These cross the Shadow DOM boundary, so you can set them from your site's CSS:

```css
semantic-search {
  --appin-primary: #37B7FF;         /* accent color (buttons, highlights) */
  --appin-surface: #FFFFFF;         /* modal background */
  --appin-text: #18181B;            /* primary text */
  --appin-text-secondary: #52525B;  /* secondary text */
  --appin-muted: #71717A;           /* muted text */
  --appin-subtle: #F4F4F5;          /* subtle backgrounds / hover */
  --appin-border: #E4E4E7;          /* borders */
  --appin-backdrop: rgba(0,0,0,0.5);/* overlay behind the modal */
}
```

::: tip Auto (light/dark) matching
The widget honors an **explicit** `theme` only — it does not sniff the OS/browser theme, because "which theme this store wants" is the integrator's decision. The WooCommerce plugin's **Auto** appearance mode implements this by measuring the page background and setting `theme` for you.
:::

## JavaScript API

When using JS Config, methods are exposed on `window.AppInSearch`:

```javascript
window.AppInSearch.open();   // open the search modal
window.AppInSearch.close();  // close the search modal
```

Useful for a custom trigger button:

```html
<button onclick="window.AppInSearch.open()">Search</button>
```

## Language

Set `lang` to render the widget's UI strings (placeholder, "Show all results", status and error messages) in that language. AI-generated text (suggestions, clarifications) is localized by the API. If `lang` is omitted, the widget auto-detects from the browser.

```html
<semantic-search api-key="pk_live_..." lang="de"></semantic-search>
```

## Features

- **Shadow DOM** — full style isolation, no CSS conflicts
- **Semantic + typo-tolerant** — understands intent, not just keywords
- **AI query parsing** — extracts filters and sort from natural language
- **Accessible** — dialog semantics, focus trap, keyboard navigation, screen-reader announcements
- **Typed error states** — clear messages for auth, rate-limit, and service errors (not "no results")
- **Responsive** — works on mobile and desktop

## Requirements

- A site with indexed **products** ([Quick Start](/guide/quick-start) or the [WooCommerce plugin](/guide/woocommerce-plugin))
- A **public** key (`pk_live_...`) from the dashboard
- Your website domain must match the domain configured for the site in the dashboard
