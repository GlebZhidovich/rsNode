const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { handlerErrorAsync, httpErrors } = require('../../errors/http-errors');
const { encrypt } = require('../../crypt/crypt');
const validator = require('../../common/validation/validator');
const {
  id: idSchema,
  user: userSchema
} = require('../../common/validation/schema');

router.route('/').get(
  handlerErrorAsync(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get([
  validator(idSchema, 'params'),
  handlerErrorAsync(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getById(id);
    if (user) res.status(200).json(User.toResponse(user));
    else res.sendStatus(httpErrors.NOT_FOUND);
  })
]);

router.route('/').post(
  validator(userSchema, 'body'),
  handlerErrorAsync(async (req, res) => {
    const { name, login, password } = req.body;
    const passwordHash = await encrypt(password);
    const user = new User({ name, login, password: passwordHash });
    const result = await usersService.create(user);
    res.status(200).json(User.toResponse(result));
  })
);

router.route('/:id').put(
  validator(idSchema, 'params'),
  validator(userSchema, 'body'),
  handlerErrorAsync(async (req, res) => {
    const { id } = req.params;
    const user = req.body;
    const result = await usersService.update(id, user);
    res.status(200).json(User.toResponse(result));
  })
);

router.route('/:id').delete(
  validator(idSchema, 'params'),
  handlerErrorAsync(async (req, res) => {
    const { id } = req.params;
    await usersService.remove(id);
    res.sendStatus(200);
  })
);

module.exports = router;
