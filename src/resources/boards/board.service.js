const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getById = id => boardsRepo.getById(id);
const create = user => boardsRepo.create(user);
const update = user => boardsRepo.update(user);
const remove = id => boardsRepo.remove(id);

module.exports = { getAll, getById, create, update, remove };
