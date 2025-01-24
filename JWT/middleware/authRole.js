const isAdmin = (req, res, next) => {
  try {
    // Ensure `req.user` exists and has a role
    if (!req.user || !req.user.role) {
      return res.status(401).send({ message: "Unauthorized: No user information provided" });
    }

    // Check if the user's role is "admin"
    if (req.user.role === "admin") {
      return next();
    }

    // If the role is not "admin", deny access
    return res.status(403).send({ message: "Forbidden: Access denied" });
  } catch (error) {
    res.status(500).send({ message: "An error occurred in the isAdmin middleware", error: error.message });
  }
};

module.exports = isAdmin;
