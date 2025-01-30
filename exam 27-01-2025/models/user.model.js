// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: {
//     type: String,
//     enum: ["admin", "teacher", "student"],
//     required: true,
//     default: "student",
//   },
// });

// const User = mongoose.model("User", userSchema);
// module.exports = User;





const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "teacher", "student"], required: true },
  assignedTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // For students
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // For teachers
});

// module.exports = mongoose.model("User", userSchema);

const User = mongoose.model("User", userSchema);
module.exports = User;