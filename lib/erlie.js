
const parsers = require('./parsers');
const interpreter = require('./interpreter');

function evaluate(text) {
    const node = parsers.parse('expressions', text);
    return interpreter.process(node);
};

module.exports = {
    evaluate: evaluate
};