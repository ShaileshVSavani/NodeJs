const Exam = require('../models/Exam');

exports.createExam = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    const exam = await Exam.create({
      title,
      description,
      createdBy: req.user.id,
      questions,
    });
    res.status(201).json({ message: 'Exam created successfully', exam });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate('createdBy', 'name').populate('questions');
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    await Exam.findByIdAndDelete(id);
    res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
