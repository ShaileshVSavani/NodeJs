const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/user.model");

exports.createUser = async (req, res) => {
    const { email, password, role } = req.body;
  
    try {
      const existingUsers = await User.find();
      const isFirstUser = existingUsers.length === 0;
  
      if (isFirstUser && role !== "admin") {
        return res.status(400).send({ msg: "The first user must be an admin" });
      }
  
      if (!isFirstUser && req.user.role !== "admin") {
        return res.status(403).send({ msg: "Access denied" });
      }
  
      const isUserExists = await User.findOne({ email });
      if (isUserExists) {
        return res.status(400).send({ msg: "User already exists" });
      }
  
      // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);
        req.body.password = hashPassword;
  
      // Create the user
      let user = await User.create(req.body);
  
      // Generate a token for the created user
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
        process.env.jwt_secret,
        { expiresIn: "1d" } 
      );
  
      res.status(201).send({
        msg: "User created successfully",
        user: { id: user.id, email: user.email, role: user.role },
        token,
      });
    } catch (error) {
      res.status(500).send({ msg: "Error creating user", error: error.message });
    }
  };
  

exports.getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.send({ msg: "users list", users: users });
  } catch (error) {
    res.status(404).send({ msg: "failed to get users", error: error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let isUserExists = await User.findOne({ email });
  if (!isUserExists) {
    return res.send({ msg: "user not found" });
  }

  let isPasswordMatch = await bcrypt.compare(password, isUserExists.password);
  if (!isPasswordMatch) {
    return res.send({ msg: "password mismatch" });
  }
  let token = await jwt.sign(
    {
      email: isUserExists.email,
      id: isUserExists.id,
      username: isUserExists.username,
      role: isUserExists.role
    },
    process.env.jwt_secret
  );


  res.json({
    msg: "logged in ...",
    user: {
      email: isUserExists.email,
      id: isUserExists.id,
      username: isUserExists.username,
    },
    token,
  });
};



// Get all students (teacher)
// exports.getAllStudents = async (req, res) => {
//   try {
//     const students = await User.find({ role: "student" });
//     res.status(200).send({ msg: "Students retrieved successfully", students });
//   } catch (error) {
//     res.status(500).send({ msg: "Error retrieving students", error: error.message });
//   }
// };

exports.getAllStudents = async (req, res) => {
    try {
      const students = await User.find({ role: "student" }).populate("assignedTeacher", "username email");
      res.status(200).send({ msg: "Students retrieved successfully", students });
    } catch (error) {
      res.status(500).send({ msg: "Error retrieving students", error: error.message });
    }
  };
  


// Get all teachers (student)
// exports.getAllTeachers = async (req, res) => {
//   try {
//     const teachers = await User.find({ role: "teacher" });
//     res.status(200).send({ msg: "Teachers retrieved successfully", teachers });
//   } catch (error) {
//     res.status(500).send({ msg: "Error retrieving teachers", error: error.message });
//   }
// };

exports.getAllTeachers = async (req, res) => {
    try {
      const teachers = await User.find({ role: "teacher" }).populate("students", "username email");
      res.status(200).send({ msg: "Teachers retrieved successfully", teachers });
    } catch (error) {
      res.status(500).send({ msg: "Error retrieving teachers", error: error.message });
    }
  };
  

exports.assignTeacherToStudent = async (req, res) => {
    const { teacherId, studentId } = req.body;
  
    try {
      // Verify that both teacher and student exist
      const teacher = await User.findOne({ _id: teacherId, role: "teacher" });
      const student = await User.findOne({ _id: studentId, role: "student" });
  
      if (!teacher) {
        return res.status(404).send({ msg: "Teacher not found or invalid role" });
      }
      if (!student) {
        return res.status(404).send({ msg: "Student not found or invalid role" });
      }
  
      // Assign the teacher to the student
      student.assignedTeacher = teacher._id;
      await student.save();
  
      // Add the student to the teacher's list of students
      teacher.students.push(student._id);
      await teacher.save();
  
      res.status(200).send({
        msg: "Teacher assigned to student successfully",
        teacher: {
          id: teacher._id,
          username: teacher.username,
          email: teacher.email,
        },
        student: {
          id: student._id,
          username: student.username,
          email: student.email,
        },
      });
    } catch (error) {
      res.status(500).send({ msg: "Error assigning teacher to student", error: error.message });
    }
  };
  