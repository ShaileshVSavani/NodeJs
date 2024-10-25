// const User = require("../model/user.model");

const User = require("../model/userSchema");

const getUser = async (req, res) => {
  let data = await User.find();
  res.send(data);
};

const postUser = async (req, res) => {
  let { email, username, password } = req.body;
  let isExist = await User.findOne({ email });
  if (isExist) {
    return res.send({ msg: "User already exists" });
  } else {
    let data = await User.create(req.body);
    res.send(data);
  }
};

const Login = async (req, res) => {
  let { email, password } = req.body;
  let isExist = await User.findOne({ email });
  if (!isExist) {
    return res.send({ msg: "user not found" });
  }
  if (isExist.password != password) {
    return res.send({ msg: "invalid password" });
  }
  res.send({ msg: "login successful", user: isExist });
};

module.exports = { getUser, postUser, Login };