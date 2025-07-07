import express from "express";
import { protect, admin } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/error.js";
import {
  getAllCategories,
  getCategoryById,
  addCategory,
  editCategory,
  deleteCategory,
  bulkAddCategories,
  bulkDeleteCategories
} from "../controllers/category.controller.js";

const router = express.Router();

// Public routes - no authentication required
router.get("/", asyncHandler(getAllCategories));
router.get("/:id", asyncHandler(getCategoryById));

// CRUD operations (admin only)
router.post("/", protect, admin, asyncHandler(addCategory));
router.put("/:id", protect, admin, asyncHandler(editCategory));
router.delete("/:id", protect, admin, asyncHandler(deleteCategory));

// Bulk operations (admin only)
router.post("/bulk-add", protect, admin, asyncHandler(bulkAddCategories));
router.post("/bulk-delete", protect, admin, asyncHandler(bulkDeleteCategories));

export default router; 