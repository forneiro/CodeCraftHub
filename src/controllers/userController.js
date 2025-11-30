// src/controllers/userController.js

/**
 * User Controller
 * ---------------
 * This file contains the logic for creating users and handling user login.
 * It uses bcrypt for password hashing and jsonwebtoken for generating JWTs.
 */

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/server');

/**
 * Create a new user
 * -----------------
 * Endpoint: POST /api/users/register
 * Expects: { username, email, password }
 *
 * - Hashes the user password
 * - Creates and stores a new user in the database
 * - Returns a success message or error response
 */
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password using bcrypt (10 salt rounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to MongoDB
    await newUser.save();

    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating user',
      error: error.message,
    });
  }
};

/**
 * User Login
 * ----------
 * Endpoint: POST /api/users/login
 * Expects: { email, password }
 *
 * - Verifies that the user exists
 * - Checks if the provided password matches the stored hashed password
 * - Generates a JWT token containing user info (id + email)
 * - Returns the token if login is successful
 */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'User not found.' });

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials.' });

    // Generate a JSON Web Token (JWT)
    const token = jwt.sign(
      {
        id: user._id,       // Include user's ID in the token payload
        email: user.email,  // Also include their email
      },
      JWT_SECRET,           // Secret key from environment variables
      {
        expiresIn: JWT_EXPIRES_IN, // Token expiration time
      }
    );

    res.status(200).json({
      message: 'Login successful.',
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error logging in',
      error: error.message,
    });
  }
};
