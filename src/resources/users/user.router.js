const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { handlerErrorAsync } = require('../../errors/http-errors');

router.route('/').get(
  handlerErrorAsync(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  handlerErrorAsync(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getById(id);
    if (user) res.status(200).json(User.toResponse(user));
    else res.sendStatus(404);
  })
);

router.route('/').post(
  handlerErrorAsync(async (req, res) => {
    const { name, login, password } = req.body;
    const user = new User({ name, login, password });
    const result = await usersService.create(user);
    res.status(200).json(User.toResponse(result));
  })
);

router.route('/:id').put(
  handlerErrorAsync(async (req, res) => {
    const { id } = req.params;
    const user = req.body;
    const result = await usersService.update(id, user);
    res.status(200).json(User.toResponse(result));
  })
);

router.route('/:id').delete(
  handlerErrorAsync(async (req, res) => {
    const { id } = req.params;
    await usersService.remove(id);
    res.sendStatus(200);
  })
);

module.exports = router;
