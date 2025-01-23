const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { addQuestion, getAllQuestions, updateQuestion, deleteQuestion } = require('../controllers/questionController');
const router = express.Router();

// Routes for teachers to add, update, and delete questions
router.post('/add', authenticate, authorize(['Teacher']), addQuestion);
router.get('/', authenticate, getAllQuestions);
router.put('/:id', authenticate, authorize(['Teacher']), updateQuestion);
router.delete('/:id', authenticate, authorize(['Teacher']), deleteQuestion);

module.exports = router;
