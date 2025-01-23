
const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { 
  getUsers, 
  deleteUser, 
  createExam, 
  deleteExam, 
  viewResults 
} = require('../controllers/adminController');
const router = express.Router();

// Admin route to get all users
router.get('/users', authenticate, authorize(['Admin']), getUsers);

// Admin route to delete a user
router.delete('/users/:userId', authenticate, authorize(['Admin']), deleteUser);

// Admin route to create an exam
router.post('/exams', authenticate, authorize(['Admin']), createExam);

// Admin route to delete an exam
router.delete('/exams/:examId', authenticate, authorize(['Admin']), deleteExam);

// Admin route to view all results
router.get('/results', authenticate, authorize(['Admin']), viewResults);

module.exports = router;
