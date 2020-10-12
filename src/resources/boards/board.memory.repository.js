const tasksRepo = require('../tasks/task.memory.repository');

let boardStorage = [];

const getAll = () => {
  return [...boardStorage];
};

const getById = id => {
  return boardStorage.find(board => board.id === id);
};

const create = async board => {
  boardStorage.push(board);
};

const update = async board => {
  const index = boardStorage.findIndex(val => val.id === board.id);
  if (typeof index === 'number') {
    if (index === 0) boardStorage = [board, ...boardStorage.slice(index + 1)];
    else {
      boardStorage = [
        ...boardStorage.slice(0, index),
        board,
        ...boardStorage.slice(index + 1)
      ];
    }
  }
};

const remove = async id => {
  const index = boardStorage.findIndex(val => val.id === id);
  if (typeof index === 'number') {
    if (index === 0) boardStorage = [...boardStorage.slice(index + 1)];
    else {
      boardStorage = [
        ...boardStorage.slice(0, index),
        ...boardStorage.slice(index + 1)
      ];
    }
    await tasksRepo.removeWithBoard(id);
  }
};

module.exports = { getAll, getById, create, update, remove };
