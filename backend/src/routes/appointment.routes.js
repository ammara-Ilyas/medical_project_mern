import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/error.js";
import {
  createAppointment,
  getAllAppointments,
  getUserAppointments,
  getDoctorAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentStats,
  getAvailableDays,
  getAvailableSlots
} from "../controllers/appointment.controller.js";

const router = express.Router();

// All routes are protected
router.use(protect);

// @desc    Get appointment statistics (Admin)
// @route   GET /api/appointments/stats
// @access  Private (Admin)
router.get("/stats", authorize("admin"), asyncHandler(getAppointmentStats));

// @desc    Get all appointments (Admin)
// @route   GET /api/appointments
// @access  Private (Admin)
router.get("/", authorize("admin"), asyncHandler(getAllAppointments));

// @desc    Get user appointments
// @route   GET /api/appointments/user
// @access  Private (User)
router.get("/user", authorize("patient"), asyncHandler(getUserAppointments));

// @desc    Get doctor appointments
// @route   GET /api/appointments/doctor
// @access  Private (Doctor)
router.get("/doctor", authorize("doctor"), asyncHandler(getDoctorAppointments));

// @desc    Create appointment
// @route   POST /api/appointments
// @access  Private (Patient)
router.post("/", authorize("patient"), asyncHandler(createAppointment));

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
router.get("/:id", asyncHandler(getAppointment));

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
router.put("/:id", asyncHandler(updateAppointment));

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private (Admin)
router.delete("/:id", authorize("admin"), asyncHandler(deleteAppointment));

// Add available days and slots endpoints
router.get("/available-days", asyncHandler(getAvailableDays));
router.get("/available-slots", asyncHandler(getAvailableSlots));

export default router; 