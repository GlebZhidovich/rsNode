const router = require('express').Router();
const Board = require('./board.model');
const Column = require('./column.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.getById(id);
  if (board) res.status(200).json(Board.toResponse(board));
  else res.sendStatus(404);
});

router.route('/').post(async (req, res) => {
  const { title } = req.body;
  let { columns } = req.body;
  columns = columns.map(col => new Column(col));
  const board = new Board({ title, columns });
  await boardsService.create(board);
  res.status(200).json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  let { columns } = req.body;
  columns = columns.map(col => new Column(col));
  const board = { id, title, columns };
  const result = await boardsService.update(id, board);
  res.status(200).json(Board.toResponse(result));
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await boardsService.remove(id);
  res.sendStatus(200);
});

module.exports = router;
