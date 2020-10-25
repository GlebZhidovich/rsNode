const User = require('./user.model');
const { updateWithUser } = require('../tasks/task.service');

const getAll = async () => {
  return await User.find({});
};

const getById = async id => {
  return await User.findById(id);
};

const create = async user => {
  return await user.save();
};

const update = async (id, user) => {
  return await User.findByIdAndUpdate(id, user);
};

const remove = async id => {
  await updateWithUser(id);
  return await User.findByIdAndDelete(id);
};

module.exports = { getAll, getById, create, update, remove };
