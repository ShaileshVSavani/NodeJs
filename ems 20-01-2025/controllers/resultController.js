const Result = require('../models/Result');

exports.submitResult = async (req, res) => {
  try {
    const { exam, score } = req.body;
    const result = await Result.create({
      student: req.user.id,
      exam,
      score,
    });
    res.status(201).json({ message: 'Result submitted successfully', result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getResultsByStudent = async (req, res) => {
  try {
    const results = await Result.find({ student: req.user.id }).populate('exam', 'title');
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
