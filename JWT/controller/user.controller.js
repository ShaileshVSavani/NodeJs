const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/user.model");

exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let isUserExists = await User.findOne({ email: email });
    if (isUserExists) {
      return res.send({ msg: "User already exists" });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    req.body.password = hashPassword;
    let user = await User.create(req.body);

    try {
      let token = await jwt.sign(
        {
          email: user.email,
          id: user.id,
          username: user.username,
        },
        process.env.jwt_secret
      );
      res.send({ msg: "User created", user: user, token });
    } catch (error) {
      res.send({ msg: "error creating user", error: error });
    }
  } catch (error) {
    res.send({ msg: "error creating user", error: error });
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
