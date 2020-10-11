let tasksStorage = [];

const getAll = async () => {
  return [...tasksStorage];
};

const getById = async id => {
  return tasksStorage.find(task => task.id === id);
};

const create = async task => {
  tasksStorage.push(task);
};

const update = async task => {
  const index = tasksStorage.findIndex(val => val.id === task.id);
  tasksStorage = [
    ...tasksStorage.slice(0, index),
    task,
    ...tasksStorage.slice(index + 1)
  ];
};

const remove = async id => {
  const index = tasksStorage.findIndex(val => val.id === id);
  tasksStorage = [
    ...tasksStorage.slice(0, index),
    ...tasksStorage.slice(index + 1)
  ];
};

module.exports = { getAll, getById, create, update, remove };
