import express from "express";
import { protect, admin } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/error.js";
import { 
  getAllDoctors, 
  getDoctorById, 
  createDoctor, 
  updateDoctor, 
  deleteDoctor 
} from "../controllers/doctor.controller.js";
import upload from "../middleware/multer.middleware.js";
const router = express.Router();

// Public routes
// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
router.get("/", asyncHandler(getAllDoctors));

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
router.get("/:id", asyncHandler(getDoctorById));

// Admin only routes
// @desc    Create doctor (Admin only)
// @route   POST /api/doctors
// @access  Admin
router.post("/",  upload.single("avatar"), asyncHandler(createDoctor));

// @desc    Update doctor (Admin only)
// @route   PUT /api/doctors/:id
// @access  Admin
router.put("/:id",  upload.single("avatar"), asyncHandler(updateDoctor));

// @desc    Delete doctor (Admin only)
// @route   DELETE /api/doctors/:id
// @access  Admin
router.delete("/:id",  asyncHandler(deleteDoctor));

// Doctor image upload
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ url: req.file.path, public_id: req.file.filename });
});

export default router; 