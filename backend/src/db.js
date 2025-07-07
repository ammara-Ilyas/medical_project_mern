import mongoose from "mongoose";
import { createDefaultAdmin } from "./controllers/auth.controller.js";

const connectDB = async (url) => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    
    const conn = await mongoose.connect(url);
    console.log("url",url);
    console.log(`✅ MongoDB connected successfully: ${conn.connection.host}`);
   await createDefaultAdmin()
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔄 MongoDB connection closed through app termination');
      process.exit(0);
    });
    
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
