import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: true,
    trim: true,
    maxlength: [50, "Category name cannot exceed 50 characters"]
  }
}, {
  timestamps: true
});

export default mongoose.model("Category", categorySchema); 