const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { createExam, getAllExams, deleteExam, attemptExam, getAttemptedExams } = require('../controllers/examController');
const router = express.Router();

// Routes for teachers to create, update, delete exams and view exams they created
router.post('/create', authenticate, authorize(['Teacher']), createExam);
router.get('/my-exams', authenticate, authorize(['Teacher']), getAllExams); // Teacher's exams they created
router.delete('/:id', authenticate, authorize(['Teacher']), deleteExam);

// Routes for students to attempt exams
router.post('/attempt/:examId', authenticate, authorize(['Student']), attemptExam);

// Route for students to get all their attempted exams
router.get('/my-attempts', authenticate, authorize(['Student']), getAttemptedExams); // Route for student's attempted exams

module.exports = router;
