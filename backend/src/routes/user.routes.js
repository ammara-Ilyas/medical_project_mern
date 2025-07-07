import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/error.js";

const router = express.Router();

// All routes are protected
router.use(protect);

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
router.get("/", authorize("admin"), asyncHandler(async (req, res) => {
  res.json({ message: "Get all users - Admin only" });
}));

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get("/profile", asyncHandler(async (req, res) => {
  res.json({ 
    success: true,
    user: req.user 
  });
}));

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put("/profile", asyncHandler(async (req, res) => {
  res.json({ message: "Update user profile" });
}));

export default router; 