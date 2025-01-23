const Exam = require('../models/Exam');
const Result = require('../models/Result');

// Create an exam
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

// Get all exams for Teacher (exams they created)
exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find({ createdBy: req.user.id }).populate('createdBy', 'name').populate('questions');
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an exam
exports.deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    await Exam.findByIdAndDelete(id);
    res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an exam
exports.updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedExam = await Exam.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json({ message: 'Exam updated successfully', updatedExam });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Attempt Exam (Student submits answers)
exports.attemptExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const { answers } = req.body; // Array of answers from the student

    const exam = await Exam.findById(examId).populate('questions');

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    let score = 0;
    exam.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score += 1; // Increment score for each correct answer
      }
    });

    // Save the result for the student
    const result = new Result({
      student: req.user.id,
      exam: examId,
      score,
    });

    await result.save();

    res.status(200).json({ message: 'Exam attempted successfully', score });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Attempted Exams for a Student
exports.getAttemptedExams = async (req, res) => {
  try {
    const results = await Result.find({ student: req.user.id })
                                .populate('exam', 'title')
                                .populate('student', 'name');
    
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
