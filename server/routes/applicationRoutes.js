const express = require("express");
const router = express.Router();
const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
  getStats,
} = require("../controllers/applicationController");

// GET /api/applications                  — list all (supports ?search= and ?status=)
router.get("/", getAllApplications);

// GET /api/applications/stats            — aggregate counts by status
// MUST be declared before /:id so "stats" is not captured as an ID param
router.get("/stats", getStats);

// POST /api/applications                 — create a new application
router.post("/", createApplication);

// GET /api/applications/:id              — single application by ID
router.get("/:id", getApplicationById);

// PUT /api/applications/:id              — update an existing application
router.put("/:id", updateApplication);

// PATCH /api/applications/:id/status     — update status only
router.patch("/:id/status", updateApplicationStatus);

// DELETE /api/applications/:id           — delete an application
router.delete("/:id", deleteApplication);

module.exports = router;
