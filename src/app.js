const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const logger = require('./common/logger');
const runDb = require('./common/db');
const {
  httpErrors,
  ValidationError,
  errorsHandler
} = require('./errors/http-errors');

runDb();

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

process.on('uncaughtException', err => {
  logger.error(err.message);
});

process.on('unhandledRejection', err => {
  logger.error(err.message);
});

app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Url: ${req.url}`);
  logger.info(`Params: ${JSON.stringify(req.query, null, 2)}`);
  logger.info(`Body: ${JSON.stringify(req.body, null, 2)}`);
  next();
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use((req, res, next) => next(ValidationError(httpErrors.NOT_FOUND)));
app.use(errorsHandler);

module.exports = app;
