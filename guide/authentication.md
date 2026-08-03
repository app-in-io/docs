# Authentication

All API endpoints require an `X-API-Key` header.

## API Keys

Keys are generated in the [dashboard](https://my.app-in.io) and follow the format `sk_live_` + 32 random characters.

```
X-API-Key: sk_live_your_api_key_here
```

::: warning Security
The full API key is shown **once** at creation. Only the SHA-256 hash is stored — if you lose the key, generate a new one.
:::

## Multiple keys

Each site can have multiple API keys with different names (e.g., "Production", "Staging", "Mobile"). Deleting a key immediately invalidates it.

## Rate limits

Limits depend on your plan:

| | Free | Pro | Enterprise |
|---|---|---|---|
| Requests/month | 200 | 100,000 | Unlimited |
| Tokens/month | 100,000 | 10,000,000 | Unlimited |
| Sites per account | 1 | 3 | Unlimited |
| Rate/minute | 60 | 180 | 480 |

**There is no cap on how much you index.** How large your catalogue is has
nothing to do with how much you use the API, so nothing limits your record
count. What bounds usage is the monthly request allowance and the per-minute
rate.

::: tip Requests and tokens are shared across your sites
The monthly request and token allowances belong to your **account**, not to
each site — two stores on one account draw from one pool. The per-minute rate
is the exception: it is a burst limit applied per site.
:::

## Response headers

Every API response includes usage headers:

```
X-Plan: free
X-Requests-Used: 42
X-Requests-Limit: 200
X-Requests-Remaining: 158
X-Tokens-Used: 45230
X-Tokens-Limit: 100000
X-Tokens-Remaining: 54770
X-Rate-Limit: 60
X-Quota-Reset: 2026-08-20T09:14:00+00:00
X-Request-Id: 019856f2-...
```

**`X-Quota-Reset`** is when your counters go back to zero. It is **not the 1st
of the month** — the window is one month long, anchored on your account, so
every account has its own reset date. Read it rather than assuming a calendar
month.

**`X-Request-Id`** identifies the request in our logs. Quote it in a support
request and we can find the call, what it searched and what came back.

### What a request costs

Search counts as 1, chat as 1, autocomplete as 0.1. **Indexing and deleting are
free** — they count 0 against the monthly allowance, though they are still
subject to the per-minute rate.

A failed request costs nothing: anything returning 400 or above is recorded but
charged at 0, so retrying while blocked does not dig the hole deeper.

## BYOK (Bring Your Own Key)

Configure your own LLM API key in the dashboard for unlimited token usage. Supported providers: OpenAI, Azure OpenAI, Anthropic, Google Gemini, Mistral.

With BYOK, `X-Tokens-Limit` returns `unlimited`.

## Error responses

| Status | Meaning |
|---|---|
| `401` | Missing or invalid API key |
| `403` | Site paused (beyond your plan's site limit), site deactivated, account blocked, collection not allowed for the site type, or — for a public key — an origin that is not on the site's allow-list |
| `429` | Rate limit or monthly quota exceeded |

::: warning A paused site is a persistent state, not a transient error
A site is **paused** when it is beyond the number of sites your plan allows —
for example after a downgrade, where the newest sites over the limit are parked
and the oldest keep running. Search and indexing both return `403` until it is
resumed. This is not something a retry will clear. Your integration should treat
it as a distinct case and tell the store owner why, rather than reporting a
generic failure — the response body carries a message you can surface directly.

**Nothing is deleted.** A paused site keeps its indexed content indefinitely;
raising your plan (or removing another site) unpauses it and everything is there,
with no re-indexing.

A trial ending is a *different* thing and does not pause anything — the account
simply moves to the Free plan, with a smaller monthly allowance.
:::

::: tip Usage headers are not sent on a `403`
The `X-Plan`, `X-Rate-Limit`, `X-Requests-*`, `X-Records-*` and `X-Tokens-*`
headers documented on successful responses are added by middleware that runs
*after* authentication. A rejected request — including a paused site — carries
none of them, so do not rely on reading a quota header to detect this state.
:::
