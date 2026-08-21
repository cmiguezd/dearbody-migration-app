import express from "express";
import { migrationRouter } from "./routes/migrations.js";
import { inspectRouter } from "./routes/inspect.js";
import { authRouter } from "./routes/auth.js";
import { shopsRouter } from "./routes/shops.js";
import { appRouter } from "./routes/app.js";
import { createReadStream } from "node:fs";
import { join } from "node:path";

const app = express();
app.use(express.json());
app.use("/api/migrations", migrationRouter);
app.use("/api/inspect", inspectRouter);
app.use("/api/shops", shopsRouter);
app.use("/auth", authRouter);
app.use("/app", appRouter);

app.get("/health", (_req, res) => res.json({ ok: true, service: "dearbody-migration-app" }));
app.get("/template-theme.zip", (_req, res) => { res.type("application/zip"); createReadStream(join(process.cwd(), "template-theme.zip")).pipe(res); });
app.get("/", (_req, res) => res.redirect("/app"));

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log("Migration app listening on :" + port));
