const Account = require("../models/Account");

/**
 * Create an account
 * @param {Object} payload
 * @returns {Promise<Account>}
 */
const createAccount = async (payload) => {
  const account = await Account.create(payload);
  return account;
};

/**
 * Query for account
 * @param {Object} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const queryAccount = async (filter, options) => {
  const account = await Account.findOne(filter, options);
  return account;
};


module.exports = {
  createAccount,
  queryAccount,
}