import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  specialization: {
    type: String,
    required: [true, "Specialization is required"],
    trim: true
  },
  licenseNumber: {
    type: String,
    required: [true, "License number is required"],
    unique: true,
    trim: true
  },
  experience: {
    type: Number,
    required: [true, "Years of experience is required"],
    min: [0, "Experience cannot be negative"]
  },
  education: [{
    degree: String,
    institution: String,
    year: Number
  }],
  certifications: [{
    name: String,
    issuingOrganization: String,
    issueDate: Date,
    expiryDate: Date
  }],
  bio: {
    type: String,
    maxlength: [1000, "Bio cannot exceed 1000 characters"]
  },
  languages: [{
    type: String,
    trim: true
  }],
  consultationFee: {
    type: Number,
    required: [true, "Consultation fee is required"],
    min: [0, "Consultation fee cannot be negative"]
  },
  availability: [{
    day: {
      type: String,
      enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    },
    startTime: String,
    endTime: String,
    isAvailable: {
      type: Boolean,
      default: true
    }
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service"
  }]
}, {
  timestamps: true
});

// Virtual for full name
doctorSchema.virtual("fullName").get(function() {
  return this.user ? `${this.user.name}` : "";
});

// Ensure virtual fields are serialized
doctorSchema.set("toJSON", { virtuals: true });
doctorSchema.set("toObject", { virtuals: true });

const Doctor= mongoose.model("Doctor", doctorSchema); 
export default Doctor