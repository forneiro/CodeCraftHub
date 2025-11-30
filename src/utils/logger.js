// src/utils/logger.js

/**
 * Logger Utility
 * --------------
 * This file configures and exports a Winston logger instance.
 *
 * Winston is a powerful logging library that allows:
 *  - Logging to multiple destinations (console, files, DB, etc.)
 *  - Custom formatting
 *  - Log level filtering (info, warn, error...)
 *
 * In this setup:
 *  - All logs are written in JSON format
 *  - Logs are printed to the console
 *  - Logs are also written to the "combined.log" file
 */

const winston = require('winston');

/**
 * Create a Winston logger instance
 * --------------------------------
 * Configuration:
 * - level: Minimum log level to capture ("info" means info, warn, error)
 * - format: JSON structured logs (useful for debugging and log management tools)
 * - transports: Where logs should be saved
 */
const logger = winston.createLogger({
  level: 'info',

  // Log messages will be formatted as JSON
  format: winston.format.json(),

  // Transports define the output destinations
  transports: [
    // Output logs to the terminal/console
    new winston.transports.Console(),

    // Save logs to a file named "combined.log"
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Export the logger so it can be used throughout the project
module.exports = logger;
