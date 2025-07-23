import mongoose from "mongoose";
import slugify from "slugify";

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  price: {
    type: Number
  },
  category: {
    type: String
  },
  duration: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String
  }],
  slug: {
    type: String,
    unique: true,
    index: true
  },
  public_id: {
    type: String
  }
}, {
  timestamps: true
});

// Auto-generate slug from title
serviceSchema.pre("save", function(next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model("Service", serviceSchema); 