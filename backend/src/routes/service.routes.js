import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} from "../controllers/service.controller.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

// Get all services
router.get("/", getAllServices);
// Create a new service (with image upload)
router.post("/", upload.single("image"), createService);
// Service image upload
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ url: req.file.path, public_id: req.file.filename });
});
// Get a single service by ID or slug
router.get("/:id", getServiceById);
// Update a service (with image upload)
router.put("/:id", upload.single("image"), updateService);
// Delete a service
router.delete("/:id", deleteService);

export default router; 