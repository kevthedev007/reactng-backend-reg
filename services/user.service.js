const User = require("../models/User");

/**
 * Create a user
 * @param {Object} payload
 * @returns {Promise<User>}
 */
const createUser = async (payload) => {
  const user = await User.create(payload);
  return user.populate("accountNumber");
};

/**
 * Query for user
 * @param {Object} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const queryUser = async (filter, options) => {
  const user = await User.findOne(filter, options);
  return user;
};

/**
 * Get ticket by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const getUserById = async (userId) => {
  return User.findById(id);
}

module.exports = {
  createUser,
  queryUser,
  getUserById,
}