// const { Router } = require("express");
// const {
//   getUser,
//   getUserById,
//   createUser,
//   updateUser,
//   deleteUser,
//   getLoginPage,
//   getSignupPage,
//   login,
// } = require("../controllers/user.controller");

// const userRouter = Router();

// // pages
// userRouter.get("/login", getLoginPage);
// userRouter.get("/signup", getSignupPage);
// userRouter.get("/", getUser);
// userRouter.get("/:userId", getUserById);
// userRouter.post("/", createUser);
// userRouter.patch("/:userId", updateUser);
// userRouter.delete("/:userId", deleteUser);
// userRouter.post("/login", login);

// module.exports = userRouter;








const { Router } = require("express");
const {
  createUser,  // This function handles user signup
  getUserById,
  updateUser,
  deleteUser,
  getLoginPage,
  getSignupPage,
  login,
} = require("../controllers/user.controller");

const userRouter = Router();

// Routes for pages
userRouter.get("/login", getLoginPage);
userRouter.get("/signup", getSignupPage);

// Signup POST route (for handling form submission)
userRouter.post("/signup", createUser); // POST /user/signup will trigger the createUser function

// Routes for CRUD operations
userRouter.get("/", getUser);
userRouter.get("/:userId", getUserById);
userRouter.patch("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);
userRouter.post("/login", login);

module.exports = userRouter;
