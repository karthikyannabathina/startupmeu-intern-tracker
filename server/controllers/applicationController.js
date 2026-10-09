const mongoose = require('mongoose');
const Application = require('../models/Application');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const escapeRegex = require('../utils/escapeRegex');

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
    // Single aggregation pass: group by status and count each bucket
    const [totalResult, statusCounts] = await Promise.all([
      Application.countDocuments(),
      Application.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
    ]);

    // Build byStatus with a guaranteed 0 for every defined status,
    // then overwrite with real counts from the aggregation result
    const byStatus = Application.STATUSES.reduce((acc, s) => {
      acc[s] = 0;
      return acc;
    }, {});

    statusCounts.forEach(({ _id, count }) => {
      if (_id in byStatus) byStatus[_id] = count;
    });

    return sendSuccess(
      res,
      { total: totalResult, byStatus },
      'Statistics retrieved successfully'
    );
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
