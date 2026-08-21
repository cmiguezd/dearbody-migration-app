import { Router } from "express";
import { getSession } from "../auth/session.js";
import { inspectStore } from "../shopify/inspect.js";

export const inspectRouter = Router();

inspectRouter.post("/", async (req, res) => {
  const shops = [req.body?.sourceShop, req.body?.destinationShop].filter(
    (shop): shop is string => typeof shop === "string" && shop.length > 0,
  );

  if (shops.length === 0) {
    return res.status(400).json({ error: "Provide sourceShop and/or destinationShop" });
  }

  try {
    const results = [];
    for (const shop of [...new Set(shops)]) {
      const session = getSession(shop);
      if (!session) {
        return res.status(401).json({
          error: `Shop ${shop} is not authorized. Install the app on that shop first.`,
        });
      }
      results.push(await inspectStore(shop, session.accessToken));
    }
    return res.json({ ok: true, stores: results });
  } catch (error) {
    return res.status(502).json({
      error: error instanceof Error ? error.message : "Shopify inspection failed",
    });
  }
});
