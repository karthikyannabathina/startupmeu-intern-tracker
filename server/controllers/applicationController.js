const mongoose = require('mongoose');
const Application = require('../models/Application');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const getAllApplications = async (req, res, next) => {
  try {
    const { search, status } = req.query;

    // Build the filter object incrementally so only provided params apply
    const filter = {};

    if (status) {
      // Reject unknown status values early — no point hitting the DB
      if (!Application.STATUSES.includes(status)) {
        return sendError(
          res,
          `Invalid status. Must be one of: ${Application.STATUSES.join(', ')}`,
          400
        );
      }
      filter.status = status;
    }

    if (search) {
      const regex = new RegExp(search, 'i'); // case-insensitive partial match
      filter.$or = [{ company: regex }, { role: regex }];
    }

    const applications = await Application.find(filter).sort({ createdAt: -1 });

    return sendSuccess(res, applications, 'Applications retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Guard against malformed ObjectIds before Mongoose throws a CastError
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 'Invalid application ID', 400);
    }

    const application = await Application.findById(id);

    if (!application) {
      return sendError(res, 'Application not found', 404);
    }

    return sendSuccess(res, application, 'Application retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const createApplication = async (req, res, next) => {
  try {
    const application = await Application.create(req.body);
    return sendSuccess(res, application, 'Application created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const updateApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 'Invalid application ID', 400);
    }

    // Strip immutable fields so a client cannot overwrite Mongoose-managed metadata
    const { _id, createdAt, updatedAt, ...updateData } = req.body;

    const application = await Application.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!application) {
      return sendError(res, 'Application not found', 404);
    }

    return sendSuccess(res, application, 'Application updated successfully');
  } catch (error) {
    next(error);
  }
};

const updateApplicationStatus = async (req, res, next) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};

const deleteApplication = async (req, res, next) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};

const getStats = async (req, res, next) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};

module.exports = {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
  getStats,
};
