const Ability = (roles = []) => {
  return (req, res, next) => {
    console.log("User on request:", req.user);

      let role = req.user.role;
      if (roles.includes(role)) {
        return next();
      } else {
        return res.status(403).send({ message: "You do not have permission to access this" });
      }
    };
  };
  
  module.exports = Ability;
  