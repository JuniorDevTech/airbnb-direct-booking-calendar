import { Router } from "express";

import { stats, recentReservations } from "./dashboard.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/stats", protect, stats);

router.get("/recent-reservations", protect, recentReservations);

export default router;
