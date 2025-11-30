// src/validations/userValidation.js

/**
 * User Validation Middleware
 * --------------------------
 * This file contains validation rules and middleware for validating
 * incoming user data using the `express-validator` library.
 *
 * Validation Steps:
 *  1. `validateUser` defines the validation rules
 *  2. `checkValidation` checks the results and returns errors if any
 */

const { body, validationResult } = require('express-validator');

/**
 * validateUser
 * ------------
 * Array of validation rules for creating or registering a user.
 *
 * Rules:
 *  - username: must not be empty
 *  - email: must be a valid email format
 *  - password: must be at least 6 characters long
 *
 * This middleware runs BEFORE the controller function.
 */
exports.validateUser = [
  body('username')
    .notEmpty()
    .withMessage('Username is required.'),

  body('email')
    .isEmail()
    .withMessage('Valid email is required.'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
];

/**
 * checkValidation
 * ---------------
 * Verifies if any validation errors occurred.
 *
 * - If errors exist, returns a 400 Bad Request response
 * - If no errors, calls next() to continue
 *
 * Usage example:
 *   router.post('/register', validateUser, checkValidation, createUser);
 */
exports.checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  // If validation errors exist, stop the request and send them to the client
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // Proceed to the next middleware or controller
  next();
};
