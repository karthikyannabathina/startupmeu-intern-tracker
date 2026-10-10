const mongoose = require('mongoose');
const Application = require('../models/Application');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const escapeRegex = require('../utils/escapeRegex');

const ALLOWED_FIELDS = ['company', 'role', 'status', 'appliedDate', 'deadline', 'jobUrl', 'location', 'salary', 'notes'];

// Only known fields are accepted; ignores _id, timestamps and Mongo operators
const pickFields = (body) =>
  Object.fromEntries(Object.entries(body).filter(([key]) => ALLOWED_FIELDS.includes(key)));

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
      const regex = new RegExp(escapeRegex(String(search).trim()), 'i'); // case-insensitive partial match
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
    const application = await Application.create(pickFields(req.body));
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
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 'Invalid application ID', 400);
    }

    const { status } = req.body;

    // Validate presence and value before touching the DB
    if (!status || !Application.STATUSES.includes(status)) {
      return sendError(
        res,
        `Invalid or missing status. Must be one of: ${Application.STATUSES.join(', ')}`,
        400
      );
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return sendError(res, 'Application not found', 404);
    }

    return sendSuccess(res, application, 'Application status updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 'Invalid application ID', 400);
    }

    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return sendError(res, 'Application not found', 404);
    }

    return sendSuccess(res, application, 'Application deleted successfully');
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const statusCounts = await Application.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Start every status at 0 so empty statuses still appear in the response
    const byStatus = Object.fromEntries(Application.STATUSES.map((s) => [s, 0]));
    let total = 0;

    statusCounts.forEach(({ _id, count }) => {
      if (_id in byStatus) {
        byStatus[_id] = count;
        total += count;
      }
    });

    return sendSuccess(res, { total, byStatus }, 'Statistics retrieved successfully');
  } catch (error) {
    next(error);
  }
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
