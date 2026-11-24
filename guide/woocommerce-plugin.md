# WooCommerce Plugin

Add AI search to your WooCommerce store — no code. The **AppIn Search** plugin keeps your product catalog in sync with AppIn automatically and adds AI-powered semantic search to your storefront: an instant search widget and an AI-powered results page. All indexing, embedding, and ranking run on the AppIn cloud; the plugin is a thin, reliable integration layer.

::: tip Prefer the API?
The plugin is the fastest path for WooCommerce stores. If you're building a custom integration or a non-WooCommerce site, use the [REST API](/guide/quick-start) directly.
:::

## Requirements

- WordPress 6.3+ (plugin 1.1.0 and later; 1.0.0 runs on 6.0+)
- WooCommerce 8.0+
- PHP 8.1+
- An AppIn account — you can create one **from inside the plugin** (below).

## Install

1. Download the plugin: [**appinio-search.zip**](https://cdn.app-in.io/plugins/appinio-search.zip).
2. In WordPress admin, go to **Plugins → Add New → Upload Plugin**, choose the zip, and install.
3. **Activate** the plugin (WooCommerce must be active).
4. Open **WooCommerce → AppIn Search**.

::: tip
The plugin is currently in public beta and is coming to the WordPress.org plugin directory. Until then, install it from the zip above.
:::

## Create your account

You can sign up right from the plugin — no need to visit the dashboard or copy keys.

1. On the **AppIn Search** settings page, enter your **email** and **store name**.
2. Click **Send code**. AppIn emails you a 6-digit verification code.
3. Enter the code (on iPhone/Mac it can be filled with one tap) and click **Verify & connect**.
4. Your secret and public API keys are provisioned and saved automatically — you're connected.

If the code doesn't arrive, use **Resend code** (there's a short cooldown). To fix a typo in your email, use **Change email / start over**.

::: tip Already have a key?
If you created a site in the [dashboard](https://my.app-in.io), paste your API key (`sk_live_...`) into the **API Key** field instead of registering.
:::

## Sync your catalog

1. Click **Sync All Products** to send your entire catalog to AppIn. Products are indexed in background batches, with a live progress indicator.
2. After the first sync, changes are pushed **automatically in real time** — creating, updating, a stock change, trashing, or restoring a product all sync on their own.

Use the **Auto Sync** toggle to turn automatic syncing off if you prefer to sync manually.

::: tip Variable & grouped products
Variable products are indexed as a single item with a min–max price range and combined attributes. Grouped products include their child products.
:::

## Add search to your storefront

Once connected, the search widget attaches to your store's existing search box automatically — your public key is set for you during registration.

- **Widget Appearance** — choose **Light**, **Dark**, or **Auto**. Auto matches your store's background.
- **Search Input Selector** *(optional)* — if your theme uses a custom search field the widget doesn't detect, enter its CSS selector here. Leave empty for automatic detection.

The widget runs inside its own isolated boundary (Shadow DOM), so it won't clash with your theme's styles.

::: tip Advanced widget configuration
The plugin sets the widget up for you. To customize colors, language, result count, or other options, see the full [Search Widget](/guide/search-widget) reference.
:::

## Add an AI search button

Since plugin version 1.1.0 you can place an **AI search** button anywhere in your store. A click on it opens the AI search.

- **Block** — in the editor, add the **AI search button** block (in the Widgets category). In the block settings you can set its own label and choose **Icon and text** or **Icon only**.
- **Shortcode** — put `[appinio_search_button]` in a page, a post or a widget. Optional attributes: `label="Find a product"` and `variant="icon"` (icon only).

The button appears only when a public key is set.

Set the look of every button under **WooCommerce → Appinio Search → AI Search Button**:

- **Button Label** — the text on the button. Leave it empty to show "AI search" in the visitor's language. With Polylang or WPML, translate your own text under their string translations. A label set on a single block or shortcode wins over this setting.
- **Button Colour** and **Button Text Colour** — the background, and the colour of the text and the icon. Leave them empty for the default blue and white.
- **Button Icon** — a small image from your media library that replaces the sparkle icon. It is shown at 16 × 16 pixels.

For other styles, your theme's CSS can target `semantic-search-button::part(button)`.

::: tip Open the search from your own code
Your theme can open the AI search with an event:

```js
window.dispatchEvent(new CustomEvent('appin-search:open'));
```

See [Search Widget](/guide/search-widget) for the button's full reference.
:::

## AI results page

The **Search Results Page** setting (on by default) powers your WordPress search results page (`/?s=`) with AI:

- **Products** are matched by AI semantic search — typo-tolerant and meaning-based.
- **Other content** (posts, pages) keeps native WordPress search, merged into the same results.
- If AppIn is temporarily unavailable, the page **falls back to native search** automatically.

This means shoppers who reach the results page via the sidebar form, a bookmark, the back button, or mobile all get AI search — not just those who use the dropdown widget.

## Settings reference

| Setting | What it controls | Section |
|---|---|---|
| API Key | Your secret key (`sk_live_...`), used to sync products. Set automatically when you register. | Connection |
| Auto Sync | Whether product changes are pushed automatically (on by default). | Connection |
| Public Key | The public key (`pk_live_...`) the storefront widget uses. Set automatically when you register. | Search Widget |
| Search Input Selector | Optional CSS selector to point the widget at a custom search field. | Search Widget |
| Search Results Page | Power the WordPress `/?s=` results page with AI (on by default). | Search Widget |
| Widget Appearance | Widget colour theme: Light, Dark, or Auto. | Search Widget |
| Button Label | Text on every AI search button; empty shows "AI search" in the visitor's language. Translatable with Polylang or WPML. | AI Search Button |
| Button Colour | Button background; empty is the default blue. | AI Search Button |
| Button Text Colour | Text and icon colour; empty is white. | AI Search Button |
| Button Icon | An image from the media library that replaces the sparkle icon. | AI Search Button |

## Support

AppIn Search is in **public beta** — your feedback shapes the roadmap. Report bugs and ideas on [GitHub](https://github.com/app-in-io/appin-woocommerce/issues).
