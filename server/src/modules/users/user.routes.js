import { Router } from "express";

import {
  getProfile,
  updateProfile,
  deleteProfile,
  changePassword,
} from "./user.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);

router.get("/profile", getProfile);

router.put("/profile", updateProfile);

router.delete("/profile", deleteProfile);

router.put("/change-password", protect, changePassword);

export default router;
