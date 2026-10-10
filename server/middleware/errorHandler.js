/**
 * Global error-handling middleware.
 * Must be registered as the last app.use() call in server.js.
 *
 * Handles:
 *  - Mongoose ValidationError  → 400
 *  - Mongoose CastError (bad ObjectId) → 400
 *  - Mongoose duplicate key (code 11000) → 409
 *  - Everything else → 500
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = null;

  // Mongoose validation errors — collect all field messages
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // Bad MongoDB ObjectId (e.g. /applications/not-an-id)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for field: ${err.path}`;
  }

  if (statusCode >= 500) {
    console.error("[Error]", err);
    if (process.env.NODE_ENV === "production")
      message = "Internal Server Error";
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    data: null,
  });
};

module.exports = errorHandler;
