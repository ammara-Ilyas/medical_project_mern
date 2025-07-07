import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/error.js";

const router = express.Router();

// All routes are protected
router.use(protect);

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
router.get("/", asyncHandler(async (req, res) => {
  res.json({ message: "Get all appointments" });
}));

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
router.get("/:id", asyncHandler(async (req, res) => {
  res.json({ message: `Get appointment ${req.params.id}` });
}));

// @desc    Create appointment
// @route   POST /api/appointments
// @access  Private
router.post("/", authorize("patient"), asyncHandler(async (req, res) => {
  res.json({ message: "Create appointment" });
}));

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
router.put("/:id", asyncHandler(async (req, res) => {
  res.json({ message: `Update appointment ${req.params.id}` });
}));

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
router.delete("/:id", asyncHandler(async (req, res) => {
  res.json({ message: `Delete appointment ${req.params.id}` });
}));

export default router; 