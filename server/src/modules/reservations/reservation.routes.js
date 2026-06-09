import { Router } from "express";

import { protect } from "../../middlewares/auth.middleware.js";

import { create, getAll, update, remove } from "./reservation.controller.js";

const router = Router();

router.use(protect);

router.post("/", create);

router.get("/property/:propertyId", getAll);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;
