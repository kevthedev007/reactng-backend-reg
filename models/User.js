const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true
  },
  course: { type: String },
  accountNumber: { type: mongoose.Types.ObjectId, ref: "Account" }
}, { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;