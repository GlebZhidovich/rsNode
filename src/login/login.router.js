const router = require('express').Router();
const {
  handlerErrorAsync,
  httpErrors,
  ValidationError
} = require('../errors/http-errors');
const { getByParams } = require('../resources/users/user.service');
const { checkPassword } = require('../crypt/crypt');
const { JWT_SECRET_KEY } = require('../common/config');
const jwt = require('jsonwebtoken');

router.route('/').post(
  handlerErrorAsync(async (req, res, next) => {
    const { login, password } = req.body;
    const user = await getByParams({ login });
    if (!user) {
      return next(new ValidationError(httpErrors.FORBIDDEN));
    }
    if (await checkPassword(password, user.password)) {
      const { _id: userId, login: userLogin } = user;
      const token = await jwt.sign(
        { userId, login: userLogin },
        JWT_SECRET_KEY
      );
      return res.status(200).json(token);
    }
    return next(new ValidationError(httpErrors.FORBIDDEN));
  })
);

module.exports = router;
