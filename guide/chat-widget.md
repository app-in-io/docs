# Chat Widget

Add AI-powered chat to your website with a single script tag. The widget is a Web Component (`<app-in-chat>`) that runs in Shadow DOM — no CSS conflicts with your site.

## Installation

### Option 1: JS Config (recommended)

```html
<script>
window.AppInChat = {
  siteId: 'YOUR_SITE_CHANNEL_ID',
};
</script>
<script type="module" src="https://cdn.app-in.io/v1/chat.js"></script>
```

### Option 2: HTML Tag

```html
<script type="module" src="https://cdn.app-in.io/v1/chat.js"></script>
<app-in-chat site-id="YOUR_SITE_CHANNEL_ID"></app-in-chat>
```

`site-id` is the Web Channel ID from the dashboard ([my.app-in.io](https://my.app-in.io) → Site → Channels → Web).

::: tip Which option to choose?
**JS Config** — easier to manage, allows programmatic control (`open()`, `close()`).
**HTML Tag** — declarative, good for static HTML sites or CMS.
:::

## Configuration

### JS Config options

```javascript
window.AppInChat = {
  siteId: '019d2548-...',       // required — Web Channel ID
  title: 'AI Assistant',        // header title
  subtitle: 'Ask me anything',  // header subtitle
  logoUrl: 'https://...',       // header logo image URL
  position: 'bottom-right',     // bottom-right (default) | bottom-left
  theme: 'light',               // light (default) | dark
  lang: 'en',                   // language for greeting/welcome
};
```

### HTML attributes

```html
<app-in-chat
  site-id="019d2548-..."
  title="AI Assistant"
  subtitle="Ask me anything"
  logo-url="https://..."
  accent-color="#FF6210"
  position="bottom-left"
  theme="dark"
  lang="et"
  price-prefix="€"
></app-in-chat>
```

| Attribute | Default | Description |
|---|---|---|
| `site-id` | — | **Required.** Web Channel ID from dashboard |
| `title` | AI Assistant | Header title |
| `subtitle` | — | Header subtitle |
| `logo-url` | — | Custom logo image URL |
| `accent-color` | `#37B7FF` | Primary color for button and accents |
| `position` | `bottom-right` | `bottom-right` or `bottom-left` |
| `theme` | `light` | `light` or `dark` |
| `lang` | auto-detected | Language code (`en`, `de`, `uk`, `ru`, `et`, etc.) |
| `price-prefix` | — | Currency symbol for product cards (`€`, `$`) |

### CSS Variables

Override styles from your site CSS:

```css
app-in-chat {
  --app-in-primary: #37B7FF;       /* accent color */
  --app-in-surface: #FFFFFF;        /* chat background */
  --app-in-text: #18181B;          /* text color */
  --app-in-text-muted: #71717A;    /* secondary text */
  --app-in-border: #E4E4E7;        /* borders */
  --app-in-user-bg: #EFF6FF;       /* user message bubble */
  --app-in-assistant-bg: #F0FDF4;  /* assistant message bubble */
  --app-in-font: 'Inter', system-ui, sans-serif;
}
```

## JavaScript API

When using JS Config, methods are exposed on `window.AppInChat`:

```javascript
window.AppInChat.open();    // open chat window
window.AppInChat.close();   // close chat window
window.AppInChat.reinit();  // reset session, start fresh
```

Useful for triggering chat from custom buttons:

```html
<button onclick="window.AppInChat.open()">Chat with us</button>
```

## Language Support

Set `lang` to receive greeting and welcome messages in that language. Languages are configured per Web Channel in the dashboard.

```html
<app-in-chat site-id="..." lang="ru"></app-in-chat>
```

If `lang` is not set, the widget auto-detects from the browser. Supported languages depend on what you've configured in the dashboard.

## Features

- **Shadow DOM** — full style isolation, no CSS conflicts
- **Responsive** — fullscreen on mobile (< 480px)
- **Session persistence** — conversation restored on page reload
- **Real-time** — responses delivered via WebSocket
- **Progressive results** — shows initial results, loads more on demand
- **Animations** — smooth open/close, message appear, typing indicator
- **~25KB gzipped** — lightweight, no heavy dependencies

## Requirements

- A site with indexed content (products, pages, or docs)
- Web Channel enabled in the dashboard (Site → Channels → Web)
- Your website domain must match the domain configured in the dashboard
