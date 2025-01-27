const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ msg: "Access denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwt_secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).send({ msg: "Invalid token", error: error.message });
  }
};

module.exports = verifyToken;
