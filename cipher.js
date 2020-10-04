function correctShift(shift, range) {
  const newShift = Math.abs(parseInt(shift, 10));
  if (newShift > range) {
    return newShift - Math.floor(newShift / range) * range;
  }
  return newShift;
}

function shiftChar(charCode, corShift, action, first, last) {
  if (action === 'encode') {
    if (charCode + corShift > last) {
      return String.fromCharCode((charCode + corShift) - last + first - 1);
    }
    return String.fromCharCode(charCode + corShift);
  } else {
    if (charCode - corShift < first) {
      return String.fromCharCode((charCode - corShift) - first + last + 1);
    }
    return String.fromCharCode(charCode - corShift);
  }
}

function caesarCipher(str, action, shift) {
  const [first, last] = [97, 122];
  const range = last - first;
  const corShift = correctShift(shift, range);
  return [...str]
    .map(char => {
      const charCode = char
        .toLowerCase().charCodeAt();
      if (charCode > last || charCode < first) {
        return char;
      }
      const newChar = shiftChar(charCode, corShift, action, first, last);
      if (char.toUpperCase() === char) {
        return newChar.toUpperCase();
      }
      return newChar;
    })
    .join('');
}

module.exports = caesarCipher;
