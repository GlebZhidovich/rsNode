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
  boardStorage = [
    ...boardStorage.slice(0, index),
    board,
    ...boardStorage.slice(index + 1)
  ];
};

const remove = async id => {
  const index = boardStorage.findIndex(val => val.id === id);
  boardStorage = [
    ...boardStorage.slice(0, index),
    ...boardStorage.slice(index + 1)
  ];
};

module.exports = { getAll, getById, create, update, remove };
