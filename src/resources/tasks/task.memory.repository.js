const Task = require('./task.model');

const getAll = async () => {
  return await Task.find({});
};

const getById = async id => {
  return await Task.findById(id);
};

const create = async task => {
  return await task.save();
};

const update = async (id, task) => {
  return await Task.findByIdAndUpdate(id, task);
};

const remove = async id => {
  return await Task.findByIdAndDelete(id);
};

const removeWithBoard = async boardId => {
  return await Task.deleteMany({ boardId });
};

const updateWithUser = async userId => {
  return await Task.updateMany({ userId }, { userId: null });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  removeWithBoard,
  updateWithUser
};
