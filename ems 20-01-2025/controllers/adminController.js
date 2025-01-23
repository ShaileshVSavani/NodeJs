const User = require('../models/User');
const Exam = require('../models/Exam');
const Result = require('../models/Result');

// Get all users (for admin)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user (for admin)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create an exam (for admin)
exports.createExam = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    const exam = new Exam({ title, description, questions, createdBy: req.user.id });
    await exam.save();
    res.status(201).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an exam (for admin)
exports.deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.examId);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View all results (for admin)
exports.viewResults = async (req, res) => {
  try {
    const results = await Result.find().populate('exam student');
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
