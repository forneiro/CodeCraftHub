// src/routes/userRoutes.js

/**
 * User Routes
 * -----------
 * This file defines the API routes related to user actions
 * such as registration and login.
 *
 * Route Handlers:
 *  - POST /register → Create a new user
 *  - POST /login    → Authenticate user and return JWT
 */

const express = require('express');
const { createUser, loginUser } = require('../controllers/userController');

// Create an Express router instance
const router = express.Router();

/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', createUser);

/**
 * @route   POST /api/users/login
 * @desc    Log in an existing user and return a JWT
 * @access  Public
 */
router.post('/login', loginUser);

// Export router so it can be used in server.js or main routes index
module.exports = router;
