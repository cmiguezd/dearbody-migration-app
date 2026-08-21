import { Router } from "express";
import { randomBytes } from "node:crypto";
import { saveSession } from "../auth/session.js";

export const authRouter = Router();
const states = new Set<string>();
const scopes = ["read_products", "write_products", "read_content", "write_content", "read_themes", "write_themes", "read_files", "write_files", "read_metaobjects", "write_metaobjects"];

function normalizeShop(value: string): string {
  return value.replace(/^https?:\\/\\//, "").replace(/\\/$/, "");
}

authRouter.get("/install", (req, res) => {
  const shop = normalizeShop(String(req.query.shop || ""));
  if (!shop.endsWith(".myshopify.com")) return res.status(400).send("A valid Shopify shop is required.");
  const state = randomBytes(24).toString("hex");
  states.add(state);
  const redirect = encodeURIComponent(process.env.SHOPIFY_APP_URL + "/auth/callback");
  const url = "https://" + shop + "/admin/oauth/authorize?client_id=" + encodeURIComponent(process.env.SHOPIFY_API_KEY || "") + "&scope=" + encodeURIComponent(scopes.join(",")) + "&redirect_uri=" + redirect + "&state=" + state;
  return res.redirect(url);
});

authRouter.get("/callback", async (req, res) => {
  const shop = normalizeShop(String(req.query.shop || ""));
  const state = String(req.query.state || "");
  const code = String(req.query.code || "");
  if (!states.has(state) || !shop || !code) return res.status(400).send("Invalid OAuth callback.");
  states.delete(state);
  const response = await fetch("https://" + shop + "/admin/oauth/access_token", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ client_id: process.env.SHOPIFY_API_KEY, client_secret: process.env.SHOPIFY_API_SECRET, code }) });
  if (!response.ok) return res.status(502).send("Shopify OAuth exchange failed.");
  const payload = await response.json() as { access_token: string; scope: string };
  saveSession({ shop, accessToken: payload.access_token, scopes: payload.scope.split(","), installedAt: new Date().toISOString() });
  return res.redirect("/app?installed=" + encodeURIComponent(shop));
});
