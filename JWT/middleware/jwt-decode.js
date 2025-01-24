// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const isToken = async (req, res, next) => {
//   let publicRoutes = ["/login", "/signup"];
//   console.log(req.url)
//   if (publicRoutes.includes(req.url)) {
//     return next();
//   }
//   let token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(403).send({ msg: "Token required" });
//   }

//   try {
//     let decode = await jwt.verify(token, process.env.jwt_secret);
//     req.user = decode;
//     next();
//   } catch (error) {
//     res.status(500).send({ msg: "error verifying token " });
//   }
// };

// module.exports = isToken;



const jwt = require("jsonwebtoken");
require("dotenv").config();

const isToken = (req, res, next) => {
  const publicRoutes = ["/user/login", "/user/signup"];
  console.log("Request URL:", req.url);

  // Allow public routes to bypass token verification
  if (publicRoutes.includes(req.url)) {
    return next();
  }

  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  // If no token is provided
  if (!token) {
    return res.status(401).send({ msg: "Access denied: Token required" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded payload to `req.user`
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle invalid or expired token
    res.status(403).send({ msg: "Invalid or expired token", error: error.message });
  }
};

module.exports = isToken;
