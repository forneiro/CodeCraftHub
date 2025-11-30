// src/services/userService.js

/**
 * User Service
 * ------------
 * This service layer handles business logic related to users.
 * It acts as an intermediary between the controller and the database model.
 *
 * Responsibilities:
 *  - Process incoming data before interacting with the database
 *  - Call the User model for CRUD operations
 *  - Keep business logic separated from controllers
 */

const User = require('../models/userModel');

/**
 * createUser
 * ----------
 * Creates and saves a new user in the database.
 *
 * @param {Object} userData - The user information (username, email, password)
 * @returns {Promise<Object>} The saved user document
 *
 * Usage:
 *    const savedUser = await createUser({ username, email, password });
 */
exports.createUser = async (userData) => {
  // Create a new instance of the User model
  const user = new User(userData);

  // Save it to the MongoDB database
  return await user.save();
};
