const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const {
  submitResult,
  getResultsByStudent,
} = require('../controllers/resultController');
const router = express.Router();

router.post('/submit', authenticate, submitResult);
router.get('/my-results', authenticate, getResultsByStudent);

module.exports = router;
