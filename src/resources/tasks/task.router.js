const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  res.json(tasks.map(Task.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const task = await tasksService.getById(id);
  if (task) res.status(200).json(Task.toResponse(task));
  else res.sendStatus(404);
});

router.route('/').post(async (req, res) => {
  const { title, order, description, taskId, boardId, columnId } = req.body;
  const task = new Task({
    title,
    order,
    description,
    taskId,
    boardId,
    columnId
  });
  await tasksService.create(task);
  res.status(200).json(Task.toResponse(task));
});

router.route('/:id').put(async (req, res) => {
  const { id, title, order, description, taskId, boardId, columnId } = req.body;
  const task = new Task({
    id,
    title,
    order,
    description,
    taskId,
    boardId,
    columnId
  });
  await tasksService.update(task);
  res.status(200).json(Task.toResponse(task));
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await tasksService.remove(id);
  res.sendStatus(200);
});

module.exports = router;
