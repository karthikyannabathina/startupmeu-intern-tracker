require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const applicationRoutes = require("./routes/applicationRoutes");
const errorHandler = require("./middleware/errorHandler");
const { sendError } = require("./utils/apiResponse");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Local dev + deployed client are always allowed; CLIENT_URL can add more (comma-separated)
const allowedOrigins = [
  "http://localhost:3000",
  "https://startupmeu-intern-tracker.vercel.app",
  ...(process.env.CLIENT_URL || "").split(",").filter(Boolean),
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/applications", applicationRoutes);

// Health-check — useful for confirming the server is up without needing a DB
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "InternTrack API is running" });
});

// 404 handler for unmatched routes
app.use((req, res) => sendError(res, "Route not found", 404));

// ── Global error handler (must be last) ─────────────────────────────────────
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
