import express from "express";
import { migrationRouter } from "./routes/migrations.js";

const app = express();
app.use(express.json());
app.use("/api/migrations", migrationRouter);

app.get("/health", (_req, res) => res.json({ ok: true, service: "dearbody-migration-app" }));
app.get("/", (_req, res) => res.status(200).send("Dearbody Store Migration"));

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log("Migration app listening on :" + port));
