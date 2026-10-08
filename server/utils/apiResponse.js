/**
 * Standardised JSON response helpers.
 * Every controller should use these instead of calling res.json() directly,
 * so the response envelope is consistent across all endpoints.
 *
 * Success envelope:  { success: true,  data, message, errors: null }
 * Error envelope:    { success: false, data: null, message, errors }
 */

const sendSuccess = (res, data, message = 'OK', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    errors: null,
  });
};

const sendError = (res, message = 'Internal Server Error', statusCode = 500, errors = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    data: null,
    errors,
  });
};

module.exports = { sendSuccess, sendError };
