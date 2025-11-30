// src/config/db.js

/**
 * Database Connection Configuration
 * ---------------------------------
 * This file handles the connection to the MongoDB database using Mongoose.
 * It loads environment variables from the .env file and exports a function
 * that initializes the database connection when called from the server.
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

/**
 * Connects to MongoDB using the connection string stored in MONGODB_URI.
 * The function is asynchronous to ensure the server waits for
 * the connection to be established before continuing.
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,       // Ensures proper URL parsing
      useUnifiedTopology: true,    // Enables the new connection management engine
    });

    console.log('MongoDB connected successfully.');
  } catch (error) {
    // If connection fails, log the error and stop the server
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process with failure code
  }
};

// Export the function so it can be used in server.js
module.exports = connectDB;
