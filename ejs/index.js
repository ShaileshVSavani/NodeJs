const express = require("express");
const path = require("path");
const userRouter = require("./routes/user.route");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRouter);
app.listen(8090, () => {
  console.log("listening on port 8090");
});
