
const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task: String,
    status: {type :Boolean, default: false},
  

})

const Task = mongoose.model('Task', TodoSchema)

module.exports = Task