import express from "express";
import { 
  signup, 
  login, 
  verifyOTP, 
  resendOTP, 
  requestPasswordReset, 
  resetPassword, 
  changePassword, 
  updateProfile, 
  getProfile,
  getAllUsers 
} from "../controllers/auth.controller.js";
import { protect, admin } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/error.js";

const router = express.Router();

// Public routes
router.post("/signup", asyncHandler(signup));
router.post("/login", asyncHandler(login));
router.post("/verify-otp", asyncHandler(verifyOTP));
router.post("/resend-otp", asyncHandler(resendOTP));
router.post("/request-password-reset", asyncHandler(requestPasswordReset));
router.post("/reset-password", asyncHandler(resetPassword));

// Protected routes
router.get("/profile", protect, asyncHandler(getProfile));
router.put("/profile", protect, asyncHandler(updateProfile));
router.post("/change-password", protect, asyncHandler(changePassword));

// Admin only routes
router.get("/users", protect, admin, asyncHandler(getAllUsers));

export default router; 