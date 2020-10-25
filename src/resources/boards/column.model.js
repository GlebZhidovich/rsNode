const uuid = require('uuid');

class Column {
  constructor({ _id = uuid(), title, order }) {
    this._id = _id;
    this.title = title;
    this.order = order;
  }

  static toResponse(column) {
    const { _id: id, title, order } = column;
    return { id, title, order };
  }
}

module.exports = Column;
