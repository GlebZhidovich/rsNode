const options = {
  shift: ['-s', '--shift'],
  input: ['-i', '--input'],
  output: ['-o', '--output'],
  action: ['-a', '--action']
}

const settings = {
  action: {
    value: null,
    isValid: false
  },
  shift: {
    value: null,
    isValid: false
  },
  input: {
    value: null,
    isValid: false
  },
  output: {
    value: null,
    isValid: false
  }
}

function checkVal(val) {
  for (let key in options) {
    if (options.hasOwnProperty(key)) {
      if (options[key].includes(val)) {
        return key;
      }
    }
  }
  return false;
}

function validVal(key, val) {
  const validators = {
    shift(val) {
      return (typeof parseInt(val, 10) === 'number') && !isNaN(parseInt(val, 10));
    },
    input(val) {
      return typeof val === 'string';
    },
    output(val) {
      return typeof val === 'string';
    },
    action(val) {
      const actions = ['encode', 'decode'];
      return actions.includes(val);
    }
  }
  return validators[key](val);
}

function parseCommands(arr) {
  const commands = arr.slice(2);
  commands.forEach((val, i) => {
    const key = checkVal(val);
    if (key && !checkVal(commands[i + 1])) {
      settings[key].value = commands[i + 1];
    }
  });
  for (let key in settings) {
    if (settings.hasOwnProperty(key)) {
      settings[key].isValid = validVal(key, settings[key].value);
    }
  }
  return settings;
}

module.exports = parseCommands;
