const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: [
      {
        _id: {
          type: String,
          default: uuid
        },
        title: String,
        order: Number
      }
    ],
    _id: {
      type: String,
      default: uuid
    }
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
