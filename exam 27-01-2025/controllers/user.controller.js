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
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.status(200).send({ msg: "Students retrieved successfully", students });
  } catch (error) {
    res.status(500).send({ msg: "Error retrieving students", error: error.message });
  }
};

// Get all teachers (student)
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" });
    res.status(200).send({ msg: "Teachers retrieved successfully", teachers });
  } catch (error) {
    res.status(500).send({ msg: "Error retrieving teachers", error: error.message });
  }
};
