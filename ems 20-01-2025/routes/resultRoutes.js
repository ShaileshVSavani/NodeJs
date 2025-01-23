
const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { getResultsByExam, getResultsByStudent, getResultsOfStudent } = require('../controllers/resultController');
const router = express.Router();

// Routes for teachers to view student results for a specific exam
router.get('/exam/:examId', authenticate, authorize(['Teacher']), getResultsByExam);
router.get('/student/:studentId', authenticate, authorize(['Teacher']), getResultsOfStudent);

// Route for students to view their results (scores)
router.get('/my-results', authenticate, getResultsByStudent);

module.exports = router;
