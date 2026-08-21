import { createAdminGraphqlClient } from "./admin-graphql.js";

const SHOP_QUERY = `#graphql
  query ShopIdentity {
    shop {
      name
      myshopifyDomain
      plan {
        displayName
      }
    }
  }
`;

const COUNTS_QUERY = `#graphql
  query ResourceCounts {
    productsCount { count }
    pagesCount { count }
    collectionsCount { count }
    filesCount { count }
    products(first: 1) {
      nodes {
        metafields(first: 1) { nodes { id } }
      }
    }
  }
`;

export interface StoreInspection {
  shop: { name: string; myshopifyDomain: string; plan: { displayName: string } | null };
  counts: { products: number; pages: number; collections: number; files: number };
}

export async function inspectStore(shop: string, accessToken: string): Promise<StoreInspection> {
  const client = createAdminGraphqlClient(shop, accessToken);
  const identity = await client.query<{ shop: StoreInspection["shop"] }>(SHOP_QUERY);
  const counts = await client.query<{
    productsCount: { count: number };
    pagesCount: { count: number };
    collectionsCount: { count: number };
    filesCount: { count: number };
  }>(COUNTS_QUERY);

  return {
    shop: identity.shop,
    counts: {
      products: counts.productsCount.count,
      pages: counts.pagesCount.count,
      collections: counts.collectionsCount.count,
      files: counts.filesCount.count,
    },
  };
}
