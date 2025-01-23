const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  // correctAnswer: { type: Number, required: true }, 
  correctAnswer: { type: String, required: true }, // The correct answer (can be a letter or number)
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;

