# Shopify app setup

## Development app settings

In the Shopify Dev Dashboard for this app:

- Application URL: the public HTTPS URL where this app is hosted, followed by `/app` if the host routes the UI there.
- Allowed redirection URL: `https://YOUR_APP_HOST/auth/callback`
- Embedded app: enabled.

Keep the API key and API secret in the hosting provider's environment variables. Do not commit them to GitHub or paste them into chat.

## Environment

Copy `.env.example` to the host's environment and set:

- `SHOPIFY_API_KEY`
- `SHOPIFY_API_SECRET`
- `SHOPIFY_APP_URL`
- `SHOPIFY_API_VERSION` to a currently supported Admin API version
- `SESSION_SECRET`
- `DATABASE_URL` once persistent sessions are enabled

## Install flow

Open:

`https://YOUR_APP_HOST/auth/install?shop=STORE.myshopify.com`

After authorization, the callback stores the shop session and returns to the embedded app. The current repository uses an in-memory session store for development only; before client delivery it must be replaced with encrypted persistent sessions.

## API access scopes

The initial migration scope is:

`read_products,write_products,read_content,write_content,read_themes,write_themes,read_files,write_files,read_metaobjects,write_metaobjects`

The migration engine should request only the scopes needed by the selected modules. Product creation and theme writes are deliberately separate operations and should remain disabled during inspection and dry-run.

## Verification endpoint

Once a shop is authorized, send a POST request to:

`/api/inspect`

with JSON:

`{"sourceShop":"source.myshopify.com","destinationShop":"destination.myshopify.com"}`

This performs read-only identity and count checks. It does not create, update, delete, or publish anything.
