export interface ShopSession {
  shop: string;
  accessToken: string;
  scopes: string[];
  installedAt: string;
}

const sessions = new Map<string, ShopSession>();

export function saveSession(session: ShopSession): void {
  sessions.set(session.shop, session);
}

export function getSession(shop: string): ShopSession | undefined {
  return sessions.get(shop);
}

export function listSessions(): Array<Pick<ShopSession, "shop" | "scopes" | "installedAt">> {
  return [...sessions.values()].map(({ shop, scopes, installedAt }) => ({ shop, scopes, installedAt }));
}
