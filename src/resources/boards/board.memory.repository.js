const { removeWithBoard } = require('../tasks/task.memory.repository');
const Board = require('./board.model');

const getAll = async () => {
  return await Board.find({});
};

const getById = async id => {
  return await Board.findById(id);
};

const create = async board => {
  return await board.save();
};

const update = async (id, board) => {
  return Board.findByIdAndUpdate(id, board);
};

const remove = async id => {
  await removeWithBoard(id);
  return Board.findByIdAndDelete(id);
};

module.exports = { getAll, getById, create, update, remove };
