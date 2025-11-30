// src/app.js

/**
 * Main Application Entry Point
 * -----------------------------
 * This file initializes the Express application, connects to the database,
 * registers middleware, sets up routes, and starts the server.
 */

const express = require('express');
const connectDB = require('./config/db');            // Database connection function
const userRoutes = require('./routes/userRoutes');    // User-related routes
const { PORT } = require('./config/server');          // Server configuration
const logger = require('./utils/logger');             // Winston logger

// Initialize Express application
const app = express();

/**
 * Global Middleware
 * -----------------
 * express.json() parses incoming JSON requests and makes the data
 * available under req.body.
 */
app.use(express.json());

// Connect to MongoDB
connectDB();

/**
 * Route Registration
 * ------------------
 * All user-related API endpoints are prefixed with /api/users.
 * Example:
 *  POST /api/users/register
 *  POST /api/users/login
 */
app.use('/api/users', userRoutes);

/**
 * Start Server
 * ------------
 * Starts the Express server on the configured port.
 * Logs a message using Winston when the server is running.
 */
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Export the app for testing or further configuration if needed
module.exports = app;
