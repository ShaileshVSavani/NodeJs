const Result = require('../models/Result');

// Get results by Exam (teacher can view students' results for a specific exam)
exports.getResultsByExam = async (req, res) => {
  try {
    const { examId } = req.params;

    // Fetch all results for a given exam
    const results = await Result.find({ exam: examId })
                                .populate('student', 'name')
                                .populate('exam', 'title');
    
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get results by Student (teacher can view a specific student's results)
exports.getResultsOfStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Fetch all results for a given student
    const results = await Result.find({ student: studentId })
                                .populate('exam', 'title');

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get Results by Student (Student can view their results)
exports.getResultsByStudent = async (req, res) => {
  try {
    const results = await Result.find({ student: req.user.id })
                                .populate('exam', 'title')
                                .populate('student', 'name');
    
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
