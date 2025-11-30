// src/models/userModel.js

/**
 * User Model
 * ----------
 * This file defines the MongoDB User schema using Mongoose.
 * It structures how user data is stored in the database.
 *
 * Fields:
 * - username  : Unique identifier chosen by the user
 * - email     : Unique user email, required for login
 * - password  : Hashed user password (never store raw passwords!)
 * - createdAt : Timestamp for when the user was registered
 */

const mongoose = require('mongoose');

/**
 * User Schema
 * -----------
 * Defines the structure and validation rules of the User document.
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,     // Must be provided
    unique: true        // No two users can have the same username
  },
  email: {
    type: String,
    required: true,     // Must be provided
    unique: true        // Important for login and user identity
  },
  password: {
    type: String,
    required: true      // Stored as a hashed value
  },
  createdAt: {
    type: Date,
    default: Date.now   // Automatically set when creating the user
  }
});

/**
 * User Model
 * ----------
 * Connects the schema to the "User" collection in MongoDB.
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
