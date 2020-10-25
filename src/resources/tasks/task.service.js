const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();
const getById = id => tasksRepo.getById(id);
const create = user => tasksRepo.create(user);
const update = (id, task) => tasksRepo.update(id, task);
const remove = id => tasksRepo.remove(id);
const removeWithBoard = boardId => tasksRepo.removeWithBoard(boardId);
const updateWithUser = userId => tasksRepo.updateWithUser(userId);

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  updateWithUser,
  removeWithBoard
};
