export interface GraphqlResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export interface AdminGraphqlClient {
  query<T>(query: string, variables?: Record<string, unknown>): Promise<T>;
}

export function createAdminGraphqlClient(shop: string, accessToken: string): AdminGraphqlClient {
  const apiVersion = process.env.SHOPIFY_API_VERSION || "2025-10";
  const endpoint = `https://${shop}/admin/api/${apiVersion}/graphql.json`;

  return {
    async query<T>(query: string, variables: Record<string, unknown> = {}) {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
        body: JSON.stringify({ query, variables }),
      });

      const payload = (await response.json()) as GraphqlResponse<T>;
      if (!response.ok) {
        throw new Error(`Shopify Admin API returned HTTP ${response.status}`);
      }
      if (payload.errors?.length) {
        throw new Error(payload.errors.map((error) => error.message).join("; "));
      }
      if (!payload.data) {
        throw new Error("Shopify Admin API returned no data");
      }
      return payload.data;
    },
  };
}
