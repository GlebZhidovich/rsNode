const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: [
      {
        title: String,
        order: Number
      }
    ]
  },
  {
    versionKey: false
  }
);

const Board = mongoose.model('Board', boardSchema);

Board.toResponse = board => {
  const { _id: id, title, columns } = board;
  return { id, title, columns };
};

module.exports = Board;
