// src/validations/userValidation.js
const { body, validationResult } = require('express-validator');

exports.validateUser = [
  body('username').notEmpty().withMessage('Username is required.'),
  body('email').isEmail().withMessage('Valid email is required.'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
];

exports.checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  next();
};
