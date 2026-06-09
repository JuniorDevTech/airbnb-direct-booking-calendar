import { Router } from "express";

import { protect } from "../../middlewares/auth.middleware.js";

import { getCalendar } from "./calendar.controller.js";

const router = Router();

router.use(protect);

router.get("/:propertyId", getCalendar);

export default router;
