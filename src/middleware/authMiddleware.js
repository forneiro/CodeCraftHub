// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token)
    return res.status(403).json({ message: 'Token is required.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: 'Invalid token.' });

    req.user = user;
    next();
  });
};
