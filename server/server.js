require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const applicationRoutes = require('./routes/applicationRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// ── Middleware ──────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.CLIENT_URL || '').split(',').filter(Boolean);
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://startupmeu-intern-tracker.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/applications', applicationRoutes);

// Health-check — useful for confirming the server is up without needing a DB
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'InternTrack API is running' });
});

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Global error handler (must be last) ─────────────────────────────────────
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
