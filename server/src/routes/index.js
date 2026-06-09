import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import propertyRoutes from "../modules/properties/property.routes.js";
import reservationRoutes from "../modules/reservations/reservation.routes.js";
import calendarRoutes from "../modules/calendrar/calendar.routes.js";
import settingsRoutes from "../modules/settings/settings.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import syncRoutes from "../modules/sync/sync.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/properties", propertyRoutes);
router.use("/reservations", reservationRoutes);
router.use("/calendar", calendarRoutes);
router.use("/settings", settingsRoutes);
router.use("/users", userRoutes);
router.use("/sync", syncRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
