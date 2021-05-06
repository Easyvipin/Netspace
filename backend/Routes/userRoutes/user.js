import express from "express";
import {
  createList,
  customList,
  defaultList,
} from "../../Controllers/userControllers.js";
const router = express.Router();
import { protect } from "../../middleware/userMiddleware.js";

router.route("/list/default").post(protect, defaultList);
router.route("/list/custom").post(protect, customList);
router.route("/list/create").post(protect, createList);

export default router;
