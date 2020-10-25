const uuid = require('uuid');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
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
