import express from "express";
import { protect, admin } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/error.js";
import { 
  getAllNews, 
  getNewsById, 
  createNews, 
  updateNews, 
  deleteNews,
  getNewsByCategory,
  getFeaturedNews
} from "../controllers/news.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

// Test route for Cloudinary configuration
// @desc    Test Cloudinary configuration
// @route   GET /api/news/test-cloudinary
// @access  Public
router.get("/test-cloudinary", (req, res) => {
  const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'Configured' : 'Not configured',
    api_key: process.env.CLOUDINARY_API_KEY ? 'Configured' : 'Not configured',
    api_secret: process.env.CLOUDINARY_API_SECRET ? 'Configured' : 'Not configured'
  };
  
  res.json({
    message: "Cloudinary configuration test",
    config: cloudinaryConfig,
    status: Object.values(cloudinaryConfig).every(val => val === 'Configured') ? 'Ready' : 'Not ready'
  });
});

// Public routes
// @desc    Get all news
// @route   GET /api/news
// @access  Public
router.get("/", asyncHandler(getAllNews));

// @desc    Get single news
// @route   GET /api/news/:id
// @access  Public
router.get("/:id", asyncHandler(getNewsById));

// Admin only routes
// @desc    Create news (Admin only)
// @route   POST /api/news
// @access  Admin
router.post("/", protect, admin, upload.single("image"), asyncHandler(createNews));

// @desc    Update news (Admin only)
// @route   PUT /api/news/:id
// @access  Admin
router.put("/:id", protect, admin, upload.single("image"), asyncHandler(updateNews));

// @desc    Delete news (Admin only)
// @route   DELETE /api/news/:id
// @access  Admin
router.delete("/:id", protect, admin, asyncHandler(deleteNews));

export default router; 