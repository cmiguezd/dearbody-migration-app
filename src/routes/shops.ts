import { Router } from "express";
import { listSessions } from "../auth/session.js";

export const shopsRouter = Router();
shopsRouter.get("/", (_req, res) => res.json({ shops: listSessions() }));
