
const express = require("express");
const path = require("path");
const connection = require("./config/db");
const userRouter = require("./routes/user.route");
const Cookies = require("cookie-parser");
const { isLoggedIn } = require("./middlewares/isLogin");

require("dotenv").config();

const app = express();
app.use(Cookies());
app.use(express.json());  // For parsing JSON bodies
app.use(express.urlencoded({ extended: true }));  // For parsing URL-encoded data (form submissions)

// ejs setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", isLoggedIn, (req, res) => {
  let { username } = req.cookies;
  res.render("index", { username });
});
app.use("/user", userRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connection();
});
