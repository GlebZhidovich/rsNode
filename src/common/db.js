const { MONGO_CONNECTION_STRING } = require('./config');
const mongoose = require('mongoose');
const logger = require('./logger');
// const User = require('../resources/users/user.model');
// const { create } = require('../resources/users/user.service');
// const { encrypt } = require('../crypt/crypt');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

function runDb(server) {
  const db = mongoose.connection;

  db.on('error', err => {
    logger.error(`Db connection error: ${err}`);
  });
  db.once('open', async () => {
    console.log('Db connect');
    server();
    // db.dropDatabase();
    // const password = await encrypt('admin');
    // await create(new User({ name: 'admin', login: 'admin', password }));
  });
}

module.exports = runDb;
