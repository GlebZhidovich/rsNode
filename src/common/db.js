const { MONGO_CONNECTION_STRING } = require('./config');
const mongoose = require('mongoose');
const logger = require('./logger');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

function runDb() {
  const db = mongoose.connection;

  db.on('error', err => {
    logger.error(`Db connection error: ${err}`);
  });
  db.once('open', async () => {
    // we're connected!
    console.log('Db connect');
    // db.dropDatabase();
  });
}

module.exports = runDb;
