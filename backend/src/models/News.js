import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [200, "Title cannot exceed 200 characters"]
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    maxlength: [10000, "Content cannot exceed 10000 characters"]
  },
  summary: {
    type: String,
    maxlength: [500, "Summary cannot exceed 500 characters"]
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"]
  },
  tags: [{
    type: String,
    trim: true
  }],
  image: {
    type: String,
    default: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
  },
  imagePublicId: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: [1000, "Comment cannot exceed 1000 characters"]
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    isApproved: {
      type: Boolean,
      default: false
    }
  }],
  seoTitle: {
    type: String,
    maxlength: [60, "SEO title cannot exceed 60 characters"]
  },
  seoDescription: {
    type: String,
    maxlength: [160, "SEO description cannot exceed 160 characters"]
  },
  seoKeywords: [{
    type: String,
    trim: true
  }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
}, {
  timestamps: true
});

// Index for better search performance
newsSchema.index({ title: 'text', content: 'text', summary: 'text' });
newsSchema.index({ category: 1, isPublished: 1, publishedAt: -1 });
newsSchema.index({ isFeatured: 1, isPublished: 1, publishedAt: -1 });

// Virtual for like count
newsSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for comment count
newsSchema.virtual('commentCount').get(function() {
  return this.comments.filter(comment => comment.isApproved).length;
});

// Virtual for reading time (estimated)
newsSchema.virtual('readingTime').get(function() {
  const wordsPerMinute = 200;
  const wordCount = this.content.split(' ').length;
  return Math.ceil(wordCount / wordsPerMinute);
});

// Ensure virtual fields are serialized
newsSchema.set("toJSON", { virtuals: true });
newsSchema.set("toObject", { virtuals: true });

// Pre-save middleware to set publishedAt
newsSchema.pre('save', function(next) {
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

export default mongoose.model("News", newsSchema); 