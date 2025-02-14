const { Router } = require("express");
const {
  login,
  getAllUsers,
  getAllStudents,
  getAllTeachers,
  createUser,
} = require("../controllers/user.controller");
const verifyToken = require("../middleware/auth.middleware");
const checkRole = require("../middleware/role.middleware");

const router = Router();

// Public routes
router.post("/signup", createUser); // First user (admin) can sign up without auth
router.post("/login", login);

// Protected routes for Admin
router.post("/create-user", verifyToken, checkRole("admin"), createUser)
router.get("/", verifyToken, checkRole("admin"), getAllUsers);
// Admin route: Assign teacher to student
router.post( "/assign-teacher", verifyToken, checkRole("admin"),assignTeacherToStudent);


// Teacher routes
router.get("/students", verifyToken, checkRole("teacher"), getAllStudents);

// Student routes
router.get("/teachers", verifyToken, checkRole("student"), getAllTeachers);

module.exports = router;
