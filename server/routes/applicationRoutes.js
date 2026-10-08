const express = require('express');
const router = express.Router();
const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  updateApplicationStatus,
} = require('../controllers/applicationController');

// GET /api/applications                  — list all (supports ?search= and ?status=)
router.get('/', getAllApplications);

// POST /api/applications                 — create a new application
router.post('/', createApplication);

// GET /api/applications/:id              — single application by ID
router.get('/:id', getApplicationById);

// PUT /api/applications/:id              — full update of an existing application
router.put('/:id', updateApplication);

// PATCH /api/applications/:id/status     — update status only
router.patch('/:id/status', updateApplicationStatus);

module.exports = router;
