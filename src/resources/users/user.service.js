const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const getByParams = obj => usersRepo.getByParams(obj);
const create = user => usersRepo.create(user);
const update = (id, user) => usersRepo.update(id, user);
const remove = id => usersRepo.remove(id);

module.exports = { getAll, getById, getByParams, create, update, remove };
