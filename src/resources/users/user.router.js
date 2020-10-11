const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);
  res.status(200).json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const user = new User({ name, login, password });
  await usersService.create(user);
  res.status(200).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const { id, name, login, password } = req.body;
  const user = new User({ id, name, login, password });
  await usersService.update(user);
  res.status(200).json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await usersService.remove(id);
  res.sendStatus(200);
});

module.exports = router;
