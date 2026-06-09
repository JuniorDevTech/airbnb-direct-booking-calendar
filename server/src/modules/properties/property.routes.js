import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./property.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";

import { createPropertySchema } from "./property.validation.js";

const router = Router();

router.use(protect);

router.post("/", validate(createPropertySchema), create);

router.get("/", getAll);

router.get("/:id", getOne);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;
