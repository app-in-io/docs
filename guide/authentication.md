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
| Records total | 50 | 50,000 | Unlimited |
| Tokens/month | 100,000 | 10,000,000 | Unlimited |
| Rate/minute | 10 | 180 | 480 |

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
X-Rate-Limit: 10
```

## BYOK (Bring Your Own Key)

Configure your own LLM API key in the dashboard for unlimited token usage. Supported providers: OpenAI, Azure OpenAI, Anthropic, Google Gemini, Mistral.

With BYOK, `X-Tokens-Limit` returns `unlimited`.

## Error responses

| Status | Meaning |
|---|---|
| `401` | Missing or invalid API key |
| `403` | Site paused (free trial ended), site deactivated, account blocked, collection not allowed for the site type, or — for a public key — an origin that is not on the site's allow-list |
| `429` | Rate limit or monthly quota exceeded |

::: warning A paused site is a persistent state, not a transient error
When a free trial ends without a paid plan, the site is **paused**: search and
indexing both return `403` until it is resumed. This is not something a retry
will clear. Your integration should treat it as a distinct case and tell the
store owner their trial has ended, rather than reporting a generic failure —
the response body carries a message you can surface directly.

Indexed content is kept for 90 days after a pause, so starting a paid plan
within that window resumes everything without re-indexing.
:::

::: tip Usage headers are not sent on a `403`
The `X-Plan`, `X-Rate-Limit`, `X-Requests-*`, `X-Records-*` and `X-Tokens-*`
headers documented on successful responses are added by middleware that runs
*after* authentication. A rejected request — including a paused site — carries
none of them, so do not rely on reading a quota header to detect this state.
:::
