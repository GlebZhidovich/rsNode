const bcrypt = require('bcrypt');

const DEFAULT_ROUNDS = 10;

async function encrypt(password) {
  return await bcrypt.hash(password, DEFAULT_ROUNDS);
}

async function checkPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = {
  encrypt,
  checkPassword
};
