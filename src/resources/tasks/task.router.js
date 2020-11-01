const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const { handlerErrorAsync } = require('../../errors/http-errors');

router.route('/').get(
  handlerErrorAsync(async (req, res) => {
    const tasks = await tasksService.getAll();
    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  handlerErrorAsync(async (req, res) => {
    const { id } = req.params;
    const task = await tasksService.getById(id);
    if (task) res.status(200).json(Task.toResponse(task));
    else res.sendStatus(404);
  })
);

router.route('/').post(
  handlerErrorAsync(async (req, res) => {
    const { title, order, description, userId, columnId } = req.body;
    const { boardId } = req.params;
    const task = new Task({
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    });
    await tasksService.create(task);
    res.status(200).json(Task.toResponse(task));
  })
);

router.route('/:id').put(
  handlerErrorAsync(async (req, res) => {
    const task = req.body;
    const { boardId, id } = req.params;
    task.boardId = boardId;
    const result = await tasksService.update(id, task);
    res.status(200).json(Task.toResponse(result));
  })
);

router.route('/:id').delete(
  handlerErrorAsync(async (req, res) => {
    const { id } = req.params;
    await tasksService.remove(id);
    res.sendStatus(200);
  })
);

module.exports = router;
