const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});

const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;
