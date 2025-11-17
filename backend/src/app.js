import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import projectRoutes from "./routes/projectRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware - CORS configuration
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean); // Remove undefined values

// Log allowed origins on startup (helps debug CORS issues)
console.log("🔒 CORS Allowed Origins:", allowedOrigins);
if (!process.env.FRONTEND_URL) {
  console.warn("⚠️ FRONTEND_URL not set in environment variables!");
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.warn(`🚫 CORS blocked origin: ${origin}`);
        console.warn(`   Allowed origins:`, allowedOrigins);
        const error = new Error(`Not allowed by CORS. Origin: ${origin}`);
        callback(error);
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
connectDB();

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/subscribers", subscriberRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
