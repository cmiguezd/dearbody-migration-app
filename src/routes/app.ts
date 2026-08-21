import { Router } from "express";
import { readFile } from "node:fs/promises";
import { listSessions } from "../auth/session.js";

export const appRouter = Router();

appRouter.get("/", async (_req, res) => {
  const html = await readFile(new URL("../../src/ui/app.html", import.meta.url), "utf8");
  const authorized = listSessions().map((shop) => shop.shop).join(", ");
  res.type("html").send(
    html.replace("<p>Connect both Shopify stores", "<p>Authorized shops: " + authorized + ". Connect both Shopify stores"),
  );
});
