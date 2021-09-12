const crypto = require('crypto');

const KeyOne = crypto.randomBytes(64).toString('hex');
const KeyTwo = crypto.randomBytes(64).toString('hex');

console.table({ KeyOne, KeyTwo });