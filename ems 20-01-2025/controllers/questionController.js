const Question = require('../models/Question');

exports.addQuestion = async (req, res) => {
  try {
    const { text, options, correctAnswer } = req.body;
    const question = await Question.create({ text, options, correctAnswer });
    res.status(201).json({ message: 'Question added successfully', question });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedQuestion = await Question.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json({ message: 'Question updated successfully', updatedQuestion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
