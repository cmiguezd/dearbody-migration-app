import { Router } from "express";
import { validatePlan } from "../migration/validate.js";
import type { MigrationPlan } from "../migration/types.js";

export const migrationRouter = Router();

migrationRouter.post("/validate", (req, res) => {
  const result = validatePlan(req.body as MigrationPlan);
  res.status(result.valid ? 200 : 400).json(result);
});

migrationRouter.post("/plan", (req, res) => {
  const plan = req.body as MigrationPlan;
  const validation = validatePlan(plan);
  if (!validation.valid) return res.status(400).json(validation);
  return res.status(202).json({ status: "planned", plan, validation });
});
