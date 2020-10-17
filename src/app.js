const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const logger = require('./logger');

const BAD_REQUEST = 400;

class ValidationError extends Error {
  constructor() {
    super();
    this.status = BAD_REQUEST;
    this.text = 'Bad Request Error';
  }
}

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('*', (req, res, next) => {
  logger.info(`Url: ${req.url}`);
  logger.info(`Params: ${JSON.stringify(req.query, null, 2)}`);
  logger.info(`Body: ${JSON.stringify(req.body, null, 2)}`);
  next();
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  const reqName = req.url.split('/')[1];
  if (req.originalUrl === '/') {
    res.send('Service is running!');
  }
  if (reqName !== 'users' && reqName !== 'boards') {
    throw new ValidationError();
  }
  next();
});

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    logger.error(err.text);
    res.status(err.status).send(err.text);
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

process.on('uncaughtException', err => {
  logger.error(err.message);
});

process.on('unhandledRejection', err => {
  logger.error(err.message);
});

module.exports = app;
