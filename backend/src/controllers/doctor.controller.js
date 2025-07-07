import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import { successResponse, errorResponse, paginateResponse } from "../utils/response.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../middleware/multer.middleware.js";

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
export const getAllDoctors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = { isActive: true };
    
    // Filter by specialization
    if (req.query.specialization) {
      query.specialization = { $regex: req.query.specialization, $options: 'i' };
    }

    // Filter by experience
    if (req.query.minExperience) {
      query.experience = { $gte: parseInt(req.query.minExperience) };
    }

    // Filter by rating
    if (req.query.minRating) {
      query['rating.average'] = { $gte: parseFloat(req.query.minRating) };
    }

    const doctors = await Doctor.find(query)
      .populate('user', 'name email phone avatar')
      .populate('services', 'name description')
      .skip(skip)
      .limit(limit)
      .sort({ 'rating.average': -1, experience: -1 });

    const total = await Doctor.countDocuments(query);

    paginateResponse(res, doctors, page, limit, total);
  } catch (error) {
    console.error("Get all doctors error:", error);
    errorResponse(res, "Failed to fetch doctors", 500, error);
  }
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('user', 'name email phone avatar dateOfBirth gender address')
      .populate('services', 'name description price');

    if (!doctor) {
      return errorResponse(res, "Doctor not found", 404);
    }

    if (!doctor.isActive) {
      return errorResponse(res, "Doctor profile is not active", 404);
    }

    successResponse(res, doctor, "Doctor found successfully");
  } catch (error) {
    console.error("Get doctor by ID error:", error);
    errorResponse(res, "Failed to fetch doctor", 500, error);
  }
};

// @desc    Create doctor profile
// @route   POST /api/doctors
// @access  Private
export const createDoctor = async (req, res) => {
  try {
    console.log('Create doctor request body:', req.body);
    console.log('Create doctor file:', req.file);

    const {
      name,
      email,
      phone,
      password,
      specialization,
      licenseNumber,
      experience,
      education,
      certifications,
      bio,
      languages,
      consultationFee,
      availability,
      services
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password) {
      return errorResponse(res, "Name, email, phone, and password are required", 400);
    }

    if (!specialization || !licenseNumber || experience === undefined || consultationFee === undefined) {
      return errorResponse(res, "Specialization, license number, experience, and consultation fee are required", 400);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, "User with this email already exists", 400);
    }

    // Check if license number is unique
    const existingLicense = await Doctor.findOne({ licenseNumber });
    if (existingLicense) {
      return errorResponse(res, "License number already exists", 400);
    }

    let avatarUrl = '';
    let avatarPublicId = '';

    // Handle avatar upload if file is present
    if (req.file) {
      try {
        console.log('Uploading avatar to Cloudinary...');
        const uploadResult = await uploadToCloudinary(req.file, 'avatars');
        avatarUrl = uploadResult.url;
        avatarPublicId = uploadResult.public_id;
        console.log('Avatar uploaded successfully:', avatarUrl);
      } catch (uploadError) {
        console.error('Avatar upload error:', uploadError);
        return errorResponse(res, "Failed to upload avatar: " + uploadError.message, 500);
      }
    }

    // Parse arrays from FormData
    let parsedLanguages = [];
    let parsedEducation = [];
    
    try {
      if (languages) {
        parsedLanguages = typeof languages === 'string' ? JSON.parse(languages) : languages;
        console.log('Parsed languages:', parsedLanguages);
      }
      if (education) {
        parsedEducation = typeof education === 'string' ? JSON.parse(education) : education;
        console.log('Parsed education:', parsedEducation);
      }
    } catch (parseError) {
      console.error('Error parsing arrays:', parseError);
      console.log('Raw languages:', languages);
      console.log('Raw education:', education);
      // Fallback to empty arrays
      parsedLanguages = [];
      parsedEducation = [];
    }

    console.log('Creating user with data:', {
      name,
      email,
      phone,
      hasPassword: !!password,
      role: 'doctor',
      hasAvatar: !!avatarUrl
    });

    // Create user account
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: 'doctor',
      avatar: avatarUrl,
      avatarPublicId: avatarPublicId
    });

    console.log('User created successfully:', user._id);

    console.log('Creating doctor with data:', {
      userId: user._id,
      specialization,
      licenseNumber,
      experience: parseInt(experience),
      consultationFee: parseFloat(consultationFee),
      languages: parsedLanguages,
      education: parsedEducation
    });

    // Create doctor profile
    const doctor = await Doctor.create({
      user: user._id,
      specialization,
      licenseNumber,
      experience: parseInt(experience),
      education: parsedEducation,
      certifications: certifications || [],
      bio,
      languages: parsedLanguages,
      consultationFee: parseFloat(consultationFee),
      availability: availability || [],
      services: services || []
    });

    // Populate user data
    await doctor.populate('user', 'name email phone avatar');

    console.log('Doctor created successfully:', doctor._id);
    successResponse(res, doctor, "Doctor profile created successfully", 201);
  } catch (error) {
    console.error("Create doctor error:", error);
    
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return errorResponse(res, "Validation error: " + errors.join(', '), 400);
    }
    
    if (error.code === 11000) {
      return errorResponse(res, "Duplicate field value", 400);
    }
    
    errorResponse(res, "Failed to create doctor profile", 500, error);
  }
};

// @desc    Update doctor profile
// @route   PUT /api/doctors/:id
// @access  Private
export const updateDoctor = async (req, res) => {
  try {
    const {
      specialization,
      experience,
      education,
      certifications,
      bio,
      languages,
      consultationFee,
      availability,
      services,
      isActive
    } = req.body;

    let doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return errorResponse(res, "Doctor not found", 404);
    }

    // Check if user can update this doctor profile
    if (req.user.role !== 'admin' && doctor.user.toString() !== req.user.id) {
      return errorResponse(res, "Not authorized to update this doctor profile", 403);
    }

    // Update fields
    const updateFields = {};
    if (specialization) updateFields.specialization = specialization;
    if (experience !== undefined) updateFields.experience = experience;
    if (education) updateFields.education = education;
    if (certifications) updateFields.certifications = certifications;
    if (bio) updateFields.bio = bio;
    if (languages) updateFields.languages = languages;
    if (consultationFee !== undefined) updateFields.consultationFee = consultationFee;
    if (availability) updateFields.availability = availability;
    if (services) updateFields.services = services;
    if (isActive !== undefined) updateFields.isActive = isActive;

    doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    ).populate('user', 'name email phone avatar');

    successResponse(res, doctor, "Doctor profile updated successfully");
  } catch (error) {
    console.error("Update doctor error:", error);
    errorResponse(res, "Failed to update doctor profile", 500, error);
  }
};

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return errorResponse(res, "Doctor not found", 404);
    }

    // Soft delete - set isActive to false
    await Doctor.findByIdAndUpdate(req.params.id, { isActive: false });

    successResponse(res, null, "Doctor profile deleted successfully");
  } catch (error) {
    console.error("Delete doctor error:", error);
    errorResponse(res, "Failed to delete doctor profile", 500, error);
  }
};

// @desc    Get doctors by specialization
// @route   GET /api/doctors/specialization/:specialization
// @access  Public
export const getDoctorsBySpecialization = async (req, res) => {
  try {
    const { specialization } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const doctors = await Doctor.find({
      specialization: { $regex: specialization, $options: 'i' },
      isActive: true
    })
      .populate('user', 'name email phone avatar')
      .skip(skip)
      .limit(limit)
      .sort({ 'rating.average': -1 });

    const total = await Doctor.countDocuments({
      specialization: { $regex: specialization, $options: 'i' },
      isActive: true
    });

    paginateResponse(res, doctors, page, limit, total);
  } catch (error) {
    console.error("Get doctors by specialization error:", error);
    errorResponse(res, "Failed to fetch doctors", 500, error);
  }
}; 