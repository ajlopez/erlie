
const erlie = require('../..');

const fs = require('fs');

const code = fs.readFileSync(process.argv[2]).toString();

console.dir(erlie.evaluate(code));

