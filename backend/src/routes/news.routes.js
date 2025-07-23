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
  getFeaturedNews,
  likeNews,
  commentNews
} from "../controllers/news.controller.js";
import upload  from "../middleware/multer.middleware.js";

const router = express.Router();



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
router.post("/",  upload.single("image"), asyncHandler(createNews));

// @desc    Update news (Admin only)
// @route   PUT /api/news/:id
// @access  Admin
router.put("/:id",  upload.single("image"), asyncHandler(updateNews));

// @desc    Delete news (Admin only)
// @route   DELETE /api/news/:id
// @access  Admin
router.delete("/:id",  asyncHandler(deleteNews));

// Like/unlike a news article
router.post("/:id/like", protect, asyncHandler(likeNews));
// Add a comment to a news article
router.post("/:id/comment", protect, asyncHandler(commentNews));

export default router; 