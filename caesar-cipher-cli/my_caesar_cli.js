const fs = require('fs');
const path = require('path');
const Cipher = require('./transform');
const stream = require('stream');
const util = require('util');
const pipeline = util.promisify(stream.pipeline);
const parseCommands = require('./parse');

const setting = parseCommands(process.argv);

let read, write, transform, action;

function showError(message) {
  console.error(message);
  process.exit(1)
}

process.on('exit', (code) => {
  console.log(code)
});

const actions = {
  action(obj) {
    if (obj.isValid) {
      action = obj.value;
      return;
    }
    showError('Action is necessary!');
  },
  shift(obj) {
    if (obj.isValid) {
      transform = new Cipher(obj.value, action);
      return;
    }
    showError('Shift is necessary!');
  },
  input(obj) {
    if (obj.isValid) {
      read = fs.createReadStream(path.join(__dirname, obj.value));
      return;
    }
    read = process.stdin;
  },
  output(obj) {
    if (obj.isValid) {
      write = fs.createWriteStream(path.join(__dirname, obj.value));
      return;
    }
    write = process.stdout;
  },
}

for (const key in setting) {
  if (setting.hasOwnProperty(key)) {
    actions[key](setting[key]);
  }
}

function start(read, transform, write) {
  pipeline(
    read,
    transform,
    write
  ).catch((err) => {
    if (err) {
      showError('No such file or directory');
    }  else {
      console.log('Pipeline succeeded.');
    }
  });
}

start(read, transform, write);
