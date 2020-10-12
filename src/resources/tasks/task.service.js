const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();
const getById = id => tasksRepo.getById(id);
const create = user => tasksRepo.create(user);
const update = user => tasksRepo.update(user);
const remove = id => tasksRepo.remove(id);
const tasksStorage = () => tasksRepo.tasksStorage;

module.exports = { getAll, getById, create, update, remove, tasksStorage };
