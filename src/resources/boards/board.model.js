const uuid = require('uuid');
const Column = require('./column.model');

class Board {
  constructor({ id = uuid(), title, columns } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    board.columns = board.columns.map(Column.toResponse);
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
