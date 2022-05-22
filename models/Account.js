const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountNumber: { type: Number },
}, { timestamps: true }
);

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;