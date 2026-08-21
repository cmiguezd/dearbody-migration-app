import { Router } from "express";
import { validatePlan } from "../migration/validate.js";
import type { MigrationPlan } from "../migration/types.js";
import { executeMigration } from "../migration/execute.js";

export const migrationRouter = Router();

migrationRouter.post("/validate", (req, res) => {
  const result = validatePlan(req.body as MigrationPlan);
  res.status(result.valid ? 200 : 400).json(result);
});

migrationRouter.post("/execute", async (req, res) => {
  try { const plan = req.body as MigrationPlan; const validation = validatePlan(plan); if (!validation.valid) return res.status(400).json(validation); return res.json(await executeMigration(plan)); }
  catch (error) { return res.status(422).json({ status: "failed", error: error instanceof Error ? error.message : "Migration failed" }); }
});

migrationRouter.post("/plan", (req, res) => {
  const plan = req.body as MigrationPlan;
  const validation = validatePlan(plan);
  if (!validation.valid) return res.status(400).json(validation);
  return res.status(202).json({ status: "planned", plan, validation });
});
