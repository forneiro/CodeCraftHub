// src/middleware/authMiddleware.js

/**
 * Authentication Middleware
 * -------------------------
 * This middleware verifies the presence and validity of a JSON Web Token (JWT)
 * in the incoming request. If valid, it attaches the decoded user data to
 * req.user and allows the request to continue. If not, it blocks access.
 */

const jwt = require('jsonwebtoken');

/**
 * verifyToken Middleware
 * ----------------------
 * This middleware:
 * - Looks for the JWT in the "Authorization" header.
 * - Validates the token using the secret stored in environment variables.
 * - Attaches decoded user information to req.user.
 * - Calls next() to continue if valid.
 *
 * Usage example:
 *   router.get('/protected-route', verifyToken, (req, res) => {...});
 */
exports.verifyToken = (req, res, next) => {
  // Retrieve token from the Authorization header
  // Expected format: Authorization: <token>
  const token = req.headers['authorization'];

  // If no token is provided, block the request
  if (!token) {
    return res.status(403).json({ message: 'Token is required.' });
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    // Attach decoded token data (e.g., id, email) to the request object
    req.user = decodedUser;

    // Continue to the next middleware or controller
    next();
  });
};
