# Dearbody Store Migration

Embedded Shopify app for controlled store-to-store migrations.

## Current implementation

- OAuth installation route for source and destination stores
- Server-side Shopify Admin GraphQL client
- Read-only store inspection endpoint
- Selectable migration modules and validation
- Products excluded by default for blank-store cloning workflows
- Planned migration execution with dry-run and progress reporting

## Development

See [Shopify setup](docs/SHOPIFY_SETUP.md) for the Dev Dashboard settings, environment variables, scopes, and the first read-only verification.

## Security

Tokens are server-side only. Never commit secrets, access tokens, or store credentials. The current in-memory session store is for development only and must be replaced with encrypted persistent storage before client delivery.
