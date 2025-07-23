import express from "express";
import upload from "../middleware/multer.middleware.js";
import path from "path";

const router = express.Router();

// POST /api/upload/:type
router.post("/:type", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  // Return relative path to save in DB
  res.json({ path: `/${req.file.path.replace(/\\/g, "/")}` });
});

export default router; 