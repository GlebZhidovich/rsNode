const caesarCipher = require('./cipher');
const { Transform } = require('stream');

class Cipher extends Transform {

    constructor(shift = 0, action,options) {
        super(options);
        this.shift = parseInt(shift, 10);
        this.action = action;
    }

    _transform(chunk, encoding, callback) {
        const res = caesarCipher(chunk.toString(), this.action, this.shift);
        this.push(res);
        callback();
    }
}

module.exports = Cipher;
