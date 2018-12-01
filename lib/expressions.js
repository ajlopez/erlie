
var atoms = require('./atoms');
var variables = require('./variables');

function ConstantExpression(value) {
    this.evaluate = function (context) { return value; };
}

function createConstantExpression(value) {
    return new ConstantExpression(value);
}

function MatchExpression(lexpr, rexpr) {
    this.evaluate = function (context) {
        return context.match(context.evaluate(lexpr), context.evaluate(rexpr));
    };
}

function createMatchExpression(lexpr, rexpr) {
    return new MatchExpression(lexpr, rexpr);
}

function BinaryExpression(lexpr, rexpr, fn) {
    this.evaluate = function (context) {
        return fn(context.evaluate(lexpr), context.evaluate(rexpr));
    };
}

function createBinaryExpression(fn) {
    return function (lexpr, rexpr) { return new BinaryExpression(lexpr, rexpr, fn); };
}

module.exports = {
    atom: atoms.atom,
    variable: variables.variable,
    constant: createConstantExpression,
    match: createMatchExpression,
    
    add: createBinaryExpression((x, y) => x + y)
};

