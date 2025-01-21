const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { createExam } = require('../controllers/examController');
const router = express.Router();

router.post('/create', authenticate, authorize(['Teacher']), createExam);

module.exports = router;
