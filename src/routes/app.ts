import { Router } from "express";
import { readFile } from "node:fs/promises";
import { listSessions } from "../auth/session.js";

export const appRouter = Router();
appRouter.get("/", async (_req, res) => {
  const html = await readFile(new URL("../ui/app.html", import.meta.url), "utf8");
  res.type("html").send(html.replace("<p>Connect both Shopify stores", "<p>Authorized shops: " + listSessions().map((shop) => shop.shop).join(", ") + ". Connect both Shopify stores"));
});
