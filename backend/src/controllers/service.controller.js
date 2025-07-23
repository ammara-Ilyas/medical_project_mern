import Service from "../models/Service.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { deleteCloudinaryImage, uploadToCloudinary } from "../lib/cloudinary.js";

// Create a new service
export const createService = async (req, res) => {
  console.log("body",req.body);
  console.log("file",req.file);
  
  try {
    let imageUrl, public_id;
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.path, "services");
      console.log("uploadResult",uploadResult);
      
      imageUrl = uploadResult.url || uploadResult.secure_url || uploadResult; // depends on your function
      public_id = uploadResult.public_id || req.file.filename;
    }

    const service = await Service.create({
      ...req.body,
      ...(imageUrl && { image: imageUrl }),
      ...(public_id && { public_id })
    });
    return successResponse(res, service, "Service created successfully", 201);
  } catch (err) {
    return errorResponse(res, err.message || "Failed to create service", 400);
  }

};

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    return successResponse(res, services, "Services fetched successfully");
  } catch (err) {
    return errorResponse(res, err.message || "Failed to fetch services", 400);
  }
};

// Get a single service by ID or slug
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    let service;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      service = await Service.findById(id);
    } else {
      service = await Service.findOne({ slug: id });
    }
    if (!service) return errorResponse(res, "Service not found", 404);
    return successResponse(res, service, "Service fetched successfully");
  } catch (err) {
    return errorResponse(res, err.message || "Failed to fetch service", 400);
  }
};

// Update a service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) return errorResponse(res, "Service not found", 404);

    // Handle new image upload
    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (service.public_id) {
        await deleteCloudinaryImage(service.public_id);
      }
      const uploadResult = await uploadToCloudinary(req.file.path, "services");
      const imageUrl = uploadResult.url || uploadResult.secure_url || uploadResult;
      const public_id = uploadResult.public_id || req.file.filename;
      service.image = imageUrl;
      service.public_id = public_id;
    }

    // Update other fields
    Object.assign(service, req.body);

    const updatedService = await service.save();
    return successResponse(res, updatedService, "Service updated successfully");
  } catch (err) {
    return errorResponse(res, err.message || "Failed to update service", 400);
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) return errorResponse(res, "Service not found", 404);

    if (service && service.public_id) {
      await deleteCloudinaryImage(service.public_id);
    }

    await service.deleteOne();
    return successResponse(res, null, "Service deleted successfully");
  } catch (err) {
    return errorResponse(res, err.message || "Failed to delete service", 400);
  }
}; 