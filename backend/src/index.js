import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import connectDB from "./db.js";
import { createDefaultAdmin } from "./controllers/auth.controller.js";

// Import routes
import authRoutes from "./routes/auth.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import newsRoutes from "./routes/news.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

// Import middleware
import { errorHandler } from "./middleware/error.js";

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    process.env.FRONTEND_URL
  ].filter(Boolean),
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Logging middleware
app.use(morgan("combined"));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Database connection
const PORT = process.env.PORT || 8000;
const url = process.env.MONGODB_URI;

// Check JWT secret
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is not set in environment variables!");
  process.exit(1);
} else {
  console.log("✅ JWT_SECRET is configured");
}

connectDB(url).then(async () => {
  // Create default admin after database connection
  try {
    await createDefaultAdmin();
    console.log("✅ Default admin check completed");
  } catch (error) {
    console.error("❌ Error creating default admin:", error);
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Medical Backend API is running",
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/payments", paymentRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome to Medical Project Backend API",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      doctors: "/api/doctors",
      appointments: "/api/appointments",
      services: "/api/services",
      news: "/api/news",
      categories: "/api/categories"
    }
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("🚀 Server is running on port", PORT);
  console.log("📊 Environment:", process.env.NODE_ENV || "development");
});
