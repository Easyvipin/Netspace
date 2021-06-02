import express from "express";
import {
  createList,
  customList,
  defaultList,
  deleteListItem,
  deleteList,
  getList,
} from "../../Controllers/userControllers.js";
const router = express.Router();
import { protect } from "../../middleware/userMiddleware.js";

/* list action routes */
/* create */
router.route("/list/default").post(protect, defaultList);
router.route("/list/custom").post(protect, customList);
router.route("/list/create").post(protect, createList);
/* delete */
router.route("/list/delete").post(protect, deleteListItem);
router.route("/list/delete/watchlist").post(protect, deleteList);
/* get */
router.route("/list").get(protect, getList);

export default router;
