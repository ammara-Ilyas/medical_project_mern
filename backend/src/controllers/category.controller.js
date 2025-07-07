import Category from "../models/Category.js";

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    console.log("📋 Getting all categories - Request from:");
    // console.log("🔐 Auth header present:", !!req.headers.authorization);
    
    const categories = await Category.find().sort({ createdAt: -1 });
    console.log(`✅ Found ${categories.length} categories`);
    res.status(200).json(categories);
  } catch (error) {
    console.error("❌ Error getting categories:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

// Get single category by id
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Getting category by id:", id);

    const category = await Category.findById(id);
    if (!category) {
      console.log("Category not found:", id);
      return res.status(404).json({ message: "Category not found" });
    }
    
    console.log("Category found:", category.name);
    res.status(200).json(category);
  } catch (error) {
    console.error("Error getting category by id:", error);
    res.status(500).json({ message: "Failed to fetch category" });
  }
};

// Add single category
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    console.log("Adding category:", name, "by user:", req.user?.email);

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Category name is required" });
    }

    const exists = await Category.findOne({ name: name.trim() });
    if (exists) {
      console.log("Category already exists:", name);
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name: name.trim() });
    console.log("Category created:", category.name);
    res.status(201).json(category);
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Failed to create category" });
  }
};

// Edit single category
export const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    console.log("Editing category:", id, "to name:", name, "by user:", req.user?.email);
    
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Check if name already exists for another category
    const exists = await Category.findOne({ name: name.trim(), _id: { $ne: id } });
    if (exists) {
      console.log("Category name already exists:", name);
      return res.status(400).json({ message: "Category name already exists" });
    }
    
    const category = await Category.findByIdAndUpdate(id, { name: name.trim() }, { new: true });
    if (!category) {
      console.log("Category not found for editing:", id);
      return res.status(404).json({ message: "Category not found" });
    }
    
    console.log("Category updated:", category.name);
    res.status(200).json(category);
  } catch (error) {
    console.error("Error editing category:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
};

// Delete single category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting category:", id, "by user:", req.user?.email);
    
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      console.log("Category not found for deletion:", id);
      return res.status(404).json({ message: "Category not found" });
    }
    
    console.log("Category deleted:", category.name);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};

// Bulk add categories
export const bulkAddCategories = async (req, res) => {
  try {
    const { names } = req.body; // names: ["Surgery", "Health Care", ...]
    console.log("Bulk adding categories:", names, "by user:", req.user?.email);
    
    if (!Array.isArray(names) || names.length === 0) {
      return res.status(400).json({ message: "Names array is required" });
    }
    
    // Remove duplicates in input
    const uniqueNames = [...new Set(names.map(n => n.trim()).filter(n => n !== ""))];
    if (uniqueNames.length === 0) {
      return res.status(400).json({ message: "No valid category names provided" });
    }
    
    // Filter out already existing
    const existing = await Category.find({ name: { $in: uniqueNames } });
    const existingNames = existing.map(c => c.name);
    const toInsert = uniqueNames.filter(n => !existingNames.includes(n));
    
    if (toInsert.length === 0) {
      console.log("All categories already exist");
      return res.status(400).json({ message: "All categories already exist" });
    }
    
    const categories = await Category.insertMany(toInsert.map(name => ({ name })));
    console.log(`Bulk created ${categories.length} categories`);
    res.status(201).json(categories);
  } catch (error) {
    console.error("Error bulk adding categories:", error);
    res.status(500).json({ message: "Failed to create categories" });
  }
};

// Bulk delete categories
export const bulkDeleteCategories = async (req, res) => {
  try {
    const { ids } = req.body; // ids: ["id1", "id2", ...]
    console.log("Bulk deleting categories:", ids, "by user:", req.user?.email);
    
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "IDs array is required" });
    }
    
    const result = await Category.deleteMany({ _id: { $in: ids } });
    console.log(`Bulk deleted ${result.deletedCount} categories`);
    res.status(200).json({ message: `Deleted ${result.deletedCount} categories successfully` });
  } catch (error) {
    console.error("Error bulk deleting categories:", error);
    res.status(500).json({ message: "Failed to delete categories" });
  }
}; 