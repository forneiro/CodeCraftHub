// src/config/server.js

/**
 * Server Configuration
 * --------------------
 * This file loads environment variables and exports the server-related
 * configuration settings. These values are used throughout the application
 * (e.g., port number, JWT configuration).
 */

const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

/**
 * Exported configuration object
 * -----------------------------
 * PORT         → The port the server will run on. Defaults to 5000 if not specified.
 * JWT_SECRET   → Secret key used to sign and verify JSON Web Tokens.
 * JWT_EXPIRES_IN → Token expiration time. Defaults to "1h" if not provided.
 */
module.exports = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h'
};
