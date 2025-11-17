import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// ------------------------
// Connect to MongoDB
// ------------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// ------------------------
// Initialize Express App
// ------------------------
const app = express();

// ------------------------
// CORS Configuration
// ------------------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://build-pro-three.vercel.app"  // <-- your deployed frontend
];

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://build-pro-three.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);


// ------------------------
// Middleware
// ------------------------
app.use(express.json());

// ------------------------
// Default Route
// ------------------------
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// ------------------------
// Import Routes
// ------------------------
import projectRoutes from "./routes/projectRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";

// ------------------------
// Use Routes
// ------------------------
app.use("/api/projects", projectRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/subscribers", subscriberRoutes);

// ------------------------
// Start Server
// ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
