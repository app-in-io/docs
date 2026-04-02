# Quick Start

Get AI search working on your site in 5 minutes.

## 1. Get your API key

Sign up at [my.app-in.io](https://my.app-in.io), create a site, and generate an API key from the dashboard.

Your key looks like: `sk_live_your_api_key_here`

## 2. Index your content

```bash
curl -X POST https://api.app-in.io/v1/index/products \
  -H "X-API-Key: sk_live_your_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "prod_001",
    "url": "/products/red-shoes",
    "title": "Red Running Shoes",
    "content": "Comfortable lightweight running shoes with air cushioning.",
    "price": 99.99,
    "in_stock": true,
    "category": "footwear",
    "brand": "Nike"
  }'
```

## 3. Search

```bash
curl -X POST https://api.app-in.io/v1/search/products \
  -H "X-API-Key: sk_live_your_key_here" \
  -H "Content-Type: application/json" \
  -d '{"query": "comfortable running shoes under $100"}'
```

The AI will parse the query, extract the price filter, and return semantically relevant results.

## Collections

| Collection | Use for |
|---|---|
| `products` | E-commerce products with price, brand, stock status |
| `pages` | Website pages, blog posts, articles |
| `docs` | Documentation, knowledge base articles |

## Next steps

- [Authentication](/guide/authentication) — API key details, security, rate limits
- [API Reference](/operations/searchCollection) — full search endpoint docs
