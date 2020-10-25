const { MONGO_CONNECTION_STRING } = require('./config');
const mongoose = require('mongoose');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

function runDb() {
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    // we're connected!
    console.log('connect');
    // db.dropDatabase();
  });
}

module.exports = runDb;
