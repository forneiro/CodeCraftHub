// src/services/userService.js
const User = require('../models/userModel');

exports.createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};
