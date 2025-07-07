import express from "express";
import { protect, authorize, optionalAuth } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/error.js";

const router = express.Router();

// @desc    Get all services
// @route   GET /api/services
// @access  Public
router.get("/", optionalAuth, asyncHandler(async (req, res) => {
  res.json({ message: "Get all services" });
}));

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
router.get("/:id", optionalAuth, asyncHandler(async (req, res) => {
  res.json({ message: `Get service ${req.params.id}` });
}));

// Protected routes
router.use(protect);

// @desc    Create service
// @route   POST /api/services
// @access  Private/Admin
router.post("/", authorize("admin"), asyncHandler(async (req, res) => {
  res.json({ message: "Create service" });
}));

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
router.put("/:id", authorize("admin"), asyncHandler(async (req, res) => {
  res.json({ message: `Update service ${req.params.id}` });
}));

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
router.delete("/:id", authorize("admin"), asyncHandler(async (req, res) => {
  res.json({ message: `Delete service ${req.params.id}` });
}));

export default router; 