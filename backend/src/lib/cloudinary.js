
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv"
import { fileURLToPath } from "url";
dotenv.config()
const isConfigured = process.env.CLOUDINARY_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_SECRET_KEY;
if (isConfigured) {
  console.log(`Cloudinary configured with cloud_name: ${process.env.CLOUDINARY_NAME}`);
} else {
  console.log('Cloudinary not configured: Check your environment variables.');
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export const uploadToCloudinary = async (localFilePath, folder = "") => {
  try {
    let imageUrl = "/public/uploads/dummy.png";
    // Upload to Cloudinary if image provided
    if (localFilePath) {
      const result = await cloudinary.uploader.upload(localFilePath, {
        folder: folder,
      });
      imageUrl = result.secure_url;
      console.log("imageUrl", imageUrl);
      console.log("image req file", localFilePath);

      // Remove local file
      fs.unlinkSync(localFilePath);
    }
    return imageUrl
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw err;
  }
};

export const deleteCloudinaryImage = async (public_id) => {
  if (!public_id) return;
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (err) {
    console.error("Cloudinary delete error:", err);
  }
};

export default cloudinary;