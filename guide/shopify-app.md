# Shopify App

Add AI search to your Shopify store, with no code. The **AppInIo Search** app copies your products into AppIn and keeps them in sync. It adds an AI search box to your storefront and, if you want, a full AI results page. All indexing, embedding and ranking run on the AppIn cloud.

::: tip Prefer the API?
The app is the fastest path for Shopify stores. For a custom integration, use the [REST API](/guide/quick-start) and the [Search Widget](/guide/search-widget) directly.
:::

## Requirements

- A Shopify store.
- No AppIn account. The app creates one for you when you install it.

## Install

1. Install **AppInIo Search** in your Shopify admin.
2. Shopify asks you to approve the app's permissions. Approve them.
3. The app opens its status page inside the Shopify admin.

::: tip
The app is in **beta** and is coming to the Shopify App Store.
:::

When you install the app, AppIn creates an account, a site and a public search key for your store. You do not type a key, a code or a store address. The status page then shows **Connected**, and the first product sync starts.

You work only inside Shopify. You do not need to sign in to the AppIn dashboard. A new account starts on the Free plan.

## Sync your catalog

AppIn indexes each product that is **active** and **published to the online store**. It indexes the product once for each language that your store publishes. A field without a translation uses the text of your main language.

- **First sync.** It starts by itself after install. The status page shows its progress and its result.
- **Product changes.** When you create, edit or delete a product, AppIn updates search about 10 seconds later.
- **Nightly sync.** Every night AppIn runs a full sync. It catches changes that Shopify does not report one by one, for example translation edits and automatic collections.
- **Sync everything.** Click this button on the status page to start a full sync now.

The **Auto-sync** switch is on by default. Turn it off to stop the updates after product changes and the nightly sync. **Sync everything** still works.

A full sync removes products that are no longer in your store. When a sync fails or looks incomplete, AppIn removes nothing. The status page then shows **Failed** and the reason.

## Add search to your storefront

1. On the status page, click **Enable widget**.
2. The Shopify theme editor opens, with the AppIn search box already switched on.
3. Click **Save** in the theme editor.

The search box is now live on every page. When a shopper clicks your theme's search field, the AppIn search box opens in its place. It answers in the language of the page.

On a collection page, products from that collection come first. When the collection has fewer than 3 matches, products from the whole store fill the rest of the list.

Two settings on the status page control the search box:

- **Theme.** Light, Dark or Auto. Auto picks Dark when your storefront background is dark.
- **Search input selector.** Optional. Use it only when the app does not find your theme's search field. Enter the CSS selector of the field. Leave it empty to use the theme's own search field.

The search box works only on your store's own web addresses. AppIn reads them from Shopify: your main domain, your `myshopify.com` address and the domains of your Markets.

## Prices per country

When your store sells in several countries, each shopper sees the price, the currency and the stock of their own country. This is the same price as on your product page. A product that you do not sell in the shopper's country does not appear.

Prices per country have no setting. They work after you approve the permission that the app asks for.

A price limit in the search text (for example "under €80") and a sort by price use your store's main price.

## AI results page

The search box shows a few results. A shopper who wants all results clicks **Show all results** or presses Enter. By default, both open Shopify's own search page, which matches words only.

Turn on **Own results page** to show all AppIn results on a page inside your store's design:

1. On the status page, switch on **Own results page**.
2. Click **Save widget settings**.

The page is at `/apps/appin/search` (for example `/nl/apps/appin/search` in Dutch). It shows up to 20 products per page and at most 5 pages. Each product shows its image, title and price in the shopper's language, currency and country.

Only product searches go to this page. Searches for blog articles and pages stay on Shopify search. When AppIn cannot answer, the page sends the shopper to your store's own search, with the same words.

Each results page with search words counts as one search toward your request allowance. **Next** runs a new search, so each page counts.

## Plans and billing

You pick and pay for your plan in Shopify, not in AppIn.

1. On the status page, click **Change plan**.
2. Shopify's plan page opens. Pick **free** or **pro** and confirm.
3. Shopify sends you back to the app. The status page shows the new plan.

Shopify runs the payment and any free trial. AppIn gives your account the same plan. See [Rate limits](/guide/authentication#rate-limits) for what each plan includes.

## Uninstall

When you remove the app, AppIn deletes your store's search keys, and the search box stops. Shopify ends your subscription, and your account moves to the Free plan.

If you install the app again, AppIn uses the same site, creates a new search key and runs a full sync.

## Settings reference

| Setting | What it controls |
|---|---|
| Sync everything | Starts a full sync now. |
| Auto-sync | Updates after product changes and the nightly sync (on by default). |
| Enable widget | Opens the theme editor with the AppIn search box switched on. |
| Theme | The color scheme of the search box: Light (default), Dark or Auto. |
| Search input selector | Optional CSS selector of a search field that the app does not find by itself. |
| Own results page | Sends "Show all results" and product searches to the AppIn results page (off by default). |
| Change plan | Opens Shopify's plan page. |

**Save widget settings** saves the theme, the selector and the **Own results page** switch for the whole store.

## Support

Write to [support@app-in.io](mailto:support@app-in.io). The address is also in the **Help** section of the status page.
