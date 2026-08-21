# Migration architecture

The app is an embedded Shopify app. A merchant installs it in each participating store through Shopify OAuth. The app stores shop sessions server-side and never asks the merchant to paste access tokens into the UI.

## Flow

1. Install/authorize the app in the source store.
2. Install/authorize the app in the destination store.
3. Choose source and destination from authorized shops.
4. Select resource modules.
5. Validate dependencies and show warnings.
6. Run a queued migration job with per-resource checkpoints.
7. Report successes, warnings, and failures.

## Resource order

Metafield definitions → theme → files → pages → collections → menus → products → product metafield values.

Products are optional and disabled by default for blank-store template workflows.
