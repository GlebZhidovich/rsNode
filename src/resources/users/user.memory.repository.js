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
  usersStorage = [
    ...usersStorage.slice(0, index),
    user,
    ...usersStorage.slice(index + 1)
  ];
};

const remove = async id => {
  const index = usersStorage.findIndex(val => val.id === id);
  usersStorage = [
    ...usersStorage.slice(0, index),
    ...usersStorage.slice(index + 1)
  ];
};

module.exports = { getAll, getById, create, update, remove };
