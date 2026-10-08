const express = require('express');
const router = express.Router();
const {
  getAllApplications,
  getApplicationById,
} = require('../controllers/applicationController');

// GET /api/applications          — list all (supports ?search= and ?status=)
router.get('/', getAllApplications);

// GET /api/applications/:id      — single application by ID
router.get('/:id', getApplicationById);

module.exports = router;
