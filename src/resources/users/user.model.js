const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String
  },
  {
    versionKey: false
  }
);

const User = mongoose.model('User', userSchema);

User.toResponse = user => {
  const { _id: id, name, login } = user;
  return { id, name, login };
};

module.exports = User;
