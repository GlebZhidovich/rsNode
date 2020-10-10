const User = require('./user.model');

const usersStorage = [new User()];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return [...usersStorage];
};

const getById = async id => {
  return usersStorage.find(user => user.id === id);
};

module.exports = { getAll, getById };
