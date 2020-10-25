const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  {
    versionKey: false
  }
);

const Task = mongoose.model('Task', taskSchema);

Task.toResponse = task => {
  const {
    _id: id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

module.exports = Task;
