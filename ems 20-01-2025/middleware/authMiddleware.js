const jwt = require('jsonwebtoken');

exports.authenticate = async(req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authentication required' });

  // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  //   if (err) return res.status(403).json({ message: 'Invalid token' });
  //   req.user = decoded;
  //   next();
  // });
  let decode = await jwt.verify(token, process.env.jwt_secret);
  req.user = decode;
  next();
};
