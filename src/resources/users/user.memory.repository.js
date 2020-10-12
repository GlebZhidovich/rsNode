const tasksRepo = require('../tasks/task.memory.repository');

let usersStorage = [];

const getAll = async () => {
  return [...usersStorage];
};

const getById = async id => {
  return usersStorage.find(user => user.id === id);
};

const create = async user => {
  usersStorage.push(user);
};

const update = async user => {
  const index = usersStorage.findIndex(val => val.id === user.id);
  if (typeof index === 'number') {
    if (index === 0) {
      usersStorage = [user, ...usersStorage.slice(index + 1)];
    } else {
      usersStorage = [
        ...usersStorage.slice(0, index),
        user,
        ...usersStorage.slice(index + 1)
      ];
    }
  }
};

const remove = async id => {
  const index = usersStorage.findIndex(val => val.id === id);

  if (typeof index === 'number') {
    if (index === 0) usersStorage = [...usersStorage.slice(index + 1)];
    else {
      usersStorage = [
        ...usersStorage.slice(0, index),
        ...usersStorage.slice(index + 1)
      ];
    }
    await tasksRepo.updateWithUser(id);
  }
};

module.exports = { getAll, getById, create, update, remove };
