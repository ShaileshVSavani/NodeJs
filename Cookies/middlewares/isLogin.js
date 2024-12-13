const isLoggedIn = (req, res, next) => {
  let { username, userId } = req.cookies;
  if (username && userId) {
    next();
  } else {
    res.redirect("/user/login");
  }
};

module.exports = { isLoggedIn };
