# Dearbody Store Migration

Embedded Shopify app for controlled store-to-store migrations.

## Scope

- OAuth installation in source and destination stores
- Selectable source and destination stores
- Selectable migration modules: products, pages, collections, files, themes, menus, metafield definitions, and metafields
- Preview, validation, progress, error reporting, and resumable jobs
- Products excluded by default for blank-store cloning workflows

## Security

Tokens are server-side only. Never commit secrets, access tokens, or store credentials.
