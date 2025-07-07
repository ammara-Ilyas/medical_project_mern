import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service"
  },
  appointmentDate: {
    type: Date,
    required: [true, "Appointment date is required"]
  },
  appointmentTime: {
    type: String,
    required: [true, "Appointment time is required"]
  },
  duration: {
    type: Number,
    default: 30, // minutes
    min: [15, "Duration must be at least 15 minutes"],
    max: [180, "Duration cannot exceed 3 hours"]
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled", "no-show"],
    default: "pending"
  },
  type: {
    type: String,
    enum: ["in-person", "video", "phone"],
    default: "in-person"
  },
  reason: {
    type: String,
    required: [true, "Appointment reason is required"],
    maxlength: [500, "Reason cannot exceed 500 characters"]
  },
  symptoms: [{
    type: String,
    trim: true
  }],
  notes: {
    type: String,
    maxlength: [1000, "Notes cannot exceed 1000 characters"]
  },
  prescription: {
    medications: [{
      name: String,
      dosage: String,
      frequency: String,
      duration: String,
      instructions: String
    }],
    diagnosis: String,
    recommendations: String,
    followUpDate: Date
  },
  payment: {
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending"
    },
    method: {
      type: String,
      enum: ["cash", "card", "insurance", "online"],
      default: "cash"
    },
    transactionId: String
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
  cancellationReason: String,
  cancelledBy: {
    type: String,
    enum: ["patient", "doctor", "admin"]
  }
}, {
  timestamps: true
});

// Index for efficient queries
appointmentSchema.index({ patient: 1, appointmentDate: 1 });
appointmentSchema.index({ doctor: 1, appointmentDate: 1 });
appointmentSchema.index({ status: 1 });

// Virtual for formatted date
appointmentSchema.virtual("formattedDate").get(function() {
  return this.appointmentDate ? this.appointmentDate.toLocaleDateString() : "";
});

// Ensure virtual fields are serialized
appointmentSchema.set("toJSON", { virtuals: true });
appointmentSchema.set("toObject", { virtuals: true });

export default mongoose.model("Appointment", appointmentSchema); 