const express = require('express');
const router = express.Router();
const {
  getAllApplications,
  getApplicationById,
  createApplication,
} = require('../controllers/applicationController');

// GET /api/applications          — list all (supports ?search= and ?status=)
router.get('/', getAllApplications);

// POST /api/applications         — create a new application
router.post('/', createApplication);

// GET /api/applications/:id      — single application by ID
router.get('/:id', getApplicationById);

module.exports = router;
