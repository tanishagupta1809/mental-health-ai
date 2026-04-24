const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const assessmentController = require("../controllers/assessmentController");

// Assessment Routes
router.post("/", authMiddleware, assessmentController.createAssessment);
router.get("/", authMiddleware, assessmentController.getAssessments);
router.get("/statistics", authMiddleware, assessmentController.getStatistics);
router.get("/:id", authMiddleware, assessmentController.getAssessment);
router.delete("/:id", authMiddleware, assessmentController.deleteAssessment);

module.exports = router;
