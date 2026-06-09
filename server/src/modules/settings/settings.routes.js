import { Router } from "express";

import { protect } from "../../middlewares/auth.middleware.js";

import { get, update } from "./settings.controller.js";

const router = Router();

router.use(protect);

router.get("/", get);

router.put("/", update);

export default router;
