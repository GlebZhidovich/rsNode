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
  if (typeof index === 'number') {
    if (index === 0) tasksStorage = [task, ...tasksStorage.slice(index + 1)];
    else {
      tasksStorage = [
        ...tasksStorage.slice(0, index),
        task,
        ...tasksStorage.slice(index + 1)
      ];
    }
  }
};

const remove = async id => {
  const index = tasksStorage.findIndex(val => val.id === id);
  if (typeof index === 'number') {
    if (index === 0) tasksStorage = [...tasksStorage.slice(index + 1)];
    else {
      tasksStorage = [
        ...tasksStorage.slice(0, index),
        ...tasksStorage.slice(index + 1)
      ];
    }
  }
};

const removeWithBoard = async boardId => {
  tasksStorage = tasksStorage.filter(val => val.boardId !== boardId);
};

const updateWithUser = async userId => {
  tasksStorage = tasksStorage.map(val => {
    if (val.userId === userId) {
      val.userId = null;
    }
    return val;
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  removeWithBoard,
  updateWithUser,
  tasksStorage
};
