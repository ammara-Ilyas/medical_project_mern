import News from "../models/News.js";
import { successResponse, errorResponse, paginateResponse } from "../utils/response.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../middleware/multer.middleware.js";

// @desc    Get all news
// @route   GET /api/news
// @access  Public
export const getAllNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = { isPublished: true };
    
    // Filter by category
    if (req.query.category) {
      query.category = { $regex: req.query.category, $options: 'i' };
    }

    // Filter by tags
    if (req.query.tags) {
      const tags = req.query.tags.split(',');
      query.tags = { $in: tags };
    }

    // Search by title or content
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const news = await News.find(query)
      .populate('author', 'name avatar')
      .skip(skip)
      .limit(limit)
      .sort({ publishedAt: -1, createdAt: -1 });

    const total = await News.countDocuments(query);

    paginateResponse(res, news, page, limit, total);
  } catch (error) {
    console.error("Get all news error:", error);
    errorResponse(res, "Failed to fetch news", 500, error);
  }
};

// @desc    Get single news
// @route   GET /api/news/:id
// @access  Public
export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
      .populate('author', 'name avatar role');

    if (!news) {
      return errorResponse(res, "News article not found", 404);
    }

    if (!news.isPublished) {
      return errorResponse(res, "News article is not published", 404);
    }

    // Increment view count
    news.views += 1;
    await news.save();

    successResponse(res, news, "News article found successfully");
  } catch (error) {
    console.error("Get news by ID error:", error);
    errorResponse(res, "Failed to fetch news article", 500, error);
  }
};

// @desc    Create news
// @route   POST /api/news
// @access  Private/Admin
export const createNews = async (req, res) => {
  try {
    console.log('Create news request body:', req.body);
    console.log('Create news file:', req.file);

    const {
      title,
      content,
      summary,
      category,
      tags,
      isPublished,
      publishedAt,
      seoTitle,
      seoDescription,
      seoKeywords,
      isFeatured
    } = req.body;

    // Validate required fields
    if (!title || !content) {
      return errorResponse(res, "Title and content are required", 400);
    }

    if (!category) {
      return errorResponse(res, "Category is required", 400);
    }

    let imageUrl = '';
    let imagePublicId = '';

    // Handle image upload if file is present
    if (req.file) {
      try {
        console.log('Uploading image to Cloudinary...');
        const uploadResult = await uploadToCloudinary(req.file, 'news');
        imageUrl = uploadResult.url;
        imagePublicId = uploadResult.public_id;
        console.log('Image uploaded successfully:', imageUrl);
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return errorResponse(res, "Failed to upload image: " + uploadError.message, 500);
      }
    }

    // Parse arrays from FormData
    let parsedTags = [];
    let parsedKeywords = [];
    
    try {
      if (tags) {
        parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
        console.log('Parsed tags:', parsedTags);
      }
      if (seoKeywords) {
        parsedKeywords = typeof seoKeywords === 'string' ? JSON.parse(seoKeywords) : seoKeywords;
        console.log('Parsed keywords:', parsedKeywords);
      }
    } catch (parseError) {
      console.error('Error parsing arrays:', parseError);
      console.log('Raw tags:', tags);
      console.log('Raw keywords:', seoKeywords);
      // Fallback to empty arrays
      parsedTags = [];
      parsedKeywords = [];
    }

    // Validate boolean fields
    const isPublishedBool = isPublished === 'true' || isPublished === true;
    const isFeaturedBool = isFeatured === 'true' || isFeatured === true;

    console.log('Creating news with data:', {
      title,
      content: content.substring(0, 100) + '...',
      category,
      tags: parsedTags,
      isPublished: isPublishedBool,
      isFeatured: isFeaturedBool,
      hasImage: !!imageUrl
    });

    // Create news article
    const news = await News.create({
      title,
      content,
      summary,
      category,
      tags: parsedTags,
      image: imageUrl,
      imagePublicId: imagePublicId,
      author: req.user.id,
      isPublished: isPublishedBool,
      isFeatured: isFeaturedBool,
      publishedAt: isPublishedBool ? (publishedAt || new Date()) : null,
      seoTitle,
      seoDescription,
      seoKeywords: parsedKeywords
    });

    // Populate author data
    await news.populate('author', 'name avatar role');

    console.log('News created successfully:', news._id);
    successResponse(res, news, "News article created successfully", 201);
  } catch (error) {
    console.error("Create news error:", error);
    
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return errorResponse(res, "Validation error: " + errors.join(', '), 400);
    }
    
    if (error.code === 11000) {
      return errorResponse(res, "Duplicate field value", 400);
    }
    
    errorResponse(res, "Failed to create news article", 500, error);
  }
};

// @desc    Update news
// @route   PUT /api/news/:id
// @access  Private/Admin
export const updateNews = async (req, res) => {
  try {
    console.log('Update news request body:', req.body);
    console.log('Update news file:', req.file);

    const {
      title,
      content,
      summary,
      category,
      tags,
      isPublished,
      publishedAt,
      seoTitle,
      seoDescription,
      seoKeywords,
      isFeatured
    } = req.body;

    let news = await News.findById(req.params.id);

    if (!news) {
      return errorResponse(res, "News article not found", 404);
    }

    // Handle image upload if new file is present
    if (req.file) {
      try {
        console.log('Uploading new image to Cloudinary...');
        
        // Delete old image from Cloudinary if it exists
        if (news.imagePublicId) {
          console.log('Deleting old image:', news.imagePublicId);
          await deleteFromCloudinary(news.imagePublicId);
        }

        // Upload new image
        const uploadResult = await uploadToCloudinary(req.file, 'news');
        news.image = uploadResult.url;
        news.imagePublicId = uploadResult.public_id;
        console.log('New image uploaded successfully:', uploadResult.url);
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return errorResponse(res, "Failed to upload image: " + uploadError.message, 500);
      }
    }

    // Parse arrays from FormData
    let parsedTags = [];
    let parsedKeywords = [];
    
    try {
      if (tags) {
        parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
        console.log('Parsed tags:', parsedTags);
      }
      if (seoKeywords) {
        parsedKeywords = typeof seoKeywords === 'string' ? JSON.parse(seoKeywords) : seoKeywords;
        console.log('Parsed keywords:', parsedKeywords);
      }
    } catch (parseError) {
      console.error('Error parsing arrays:', parseError);
      console.log('Raw tags:', tags);
      console.log('Raw keywords:', seoKeywords);
      // Fallback to empty arrays
      parsedTags = [];
      parsedKeywords = [];
    }

    // Validate boolean fields
    const isPublishedBool = isPublished === 'true' || isPublished === true;
    const isFeaturedBool = isFeatured === 'true' || isFeatured === true;

    // Update fields
    const updateFields = {};
    if (title) updateFields.title = title;
    if (content) updateFields.content = content;
    if (summary) updateFields.summary = summary;
    if (category) updateFields.category = category;
    if (tags) updateFields.tags = parsedTags;
    if (isPublished !== undefined) {
      updateFields.isPublished = isPublishedBool;
      if (isPublishedBool && !news.publishedAt) {
        updateFields.publishedAt = publishedAt || new Date();
      }
    }
    if (isFeatured !== undefined) updateFields.isFeatured = isFeaturedBool;
    if (seoTitle) updateFields.seoTitle = seoTitle;
    if (seoDescription) updateFields.seoDescription = seoDescription;
    if (seoKeywords) updateFields.seoKeywords = parsedKeywords;

    // Update image fields if new image was uploaded
    if (req.file) {
      updateFields.image = news.image;
      updateFields.imagePublicId = news.imagePublicId;
    }

    console.log('Updating news with fields:', updateFields);

    news = await News.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    ).populate('author', 'name avatar role');

    console.log('News updated successfully:', news._id);
    successResponse(res, news, "News article updated successfully");
  } catch (error) {
    console.error("Update news error:", error);
    
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return errorResponse(res, "Validation error: " + errors.join(', '), 400);
    }
    
    errorResponse(res, "Failed to update news article", 500, error);
  }
};

// @desc    Delete news
// @route   DELETE /api/news/:id
// @access  Private/Admin
export const deleteNews = async (req, res) => {
  try {
    console.log('Delete news request for ID:', req.params.id);

    const news = await News.findById(req.params.id);

    if (!news) {
      return errorResponse(res, "News article not found", 404);
    }

    // Delete image from Cloudinary if it exists
    if (news.imagePublicId) {
      try {
        console.log('Deleting image from Cloudinary:', news.imagePublicId);
        await deleteFromCloudinary(news.imagePublicId);
        console.log('Image deleted successfully from Cloudinary');
      } catch (deleteError) {
        console.error('Image delete error:', deleteError);
        // Continue with deletion even if image deletion fails
        console.log('Continuing with news deletion despite image deletion failure');
      }
    }

    await News.findByIdAndDelete(req.params.id);
    console.log('News deleted successfully from database');

    successResponse(res, null, "News article deleted successfully");
  } catch (error) {
    console.error("Delete news error:", error);
    errorResponse(res, "Failed to delete news article", 500, error);
  }
};

// @desc    Get news by category
// @route   GET /api/news/category/:category
// @access  Public
export const getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const news = await News.find({
      category: { $regex: category, $options: 'i' },
      isPublished: true
    })
      .populate('author', 'name avatar')
      .skip(skip)
      .limit(limit)
      .sort({ publishedAt: -1 });

    const total = await News.countDocuments({
      category: { $regex: category, $options: 'i' },
      isPublished: true
    });

    paginateResponse(res, news, page, limit, total);
  } catch (error) {
    console.error("Get news by category error:", error);
    errorResponse(res, "Failed to fetch news", 500, error);
  }
};

// @desc    Get featured news
// @route   GET /api/news/featured
// @access  Public
export const getFeaturedNews = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const featuredNews = await News.find({
      isPublished: true,
      isFeatured: true
    })
      .populate('author', 'name avatar')
      .limit(limit)
      .sort({ publishedAt: -1 });

    successResponse(res, featuredNews, "Featured news fetched successfully");
  } catch (error) {
    console.error("Get featured news error:", error);
    errorResponse(res, "Failed to fetch featured news", 500, error);
  }
}; 