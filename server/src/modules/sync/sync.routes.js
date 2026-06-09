import { Router } from "express";
import { sync } from "./sync.controller.js";

const router = Router();

router.post("/:id", sync);

export default router;
