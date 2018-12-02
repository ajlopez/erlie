
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

function CompositeExpression(exprs) {
    this.evaluate = function (context) {
        var value;
        
        for (var k = 0; k < exprs.length; k++)
            value = context.evaluate(exprs[k]);
        
        return value;
    };
}

function createCompositeExpression(exprs) {
    return new CompositeExpression(exprs);
}

function WhenExpression(matchexpr, expr) {
    this.evaluate = function (context, arg) {
        if (context.match(context.evaluate(matchexpr), arg))
            return context.evaluate(expr);
    };
}

function createWhenExpression(matchexpr, expr) {
    return new WhenExpression(matchexpr, expr);
}

module.exports = {
    atom: atoms.atom,
    variable: variables.variable,
    constant: createConstantExpression,
    match: createMatchExpression,
    
    add: createBinaryExpression((x, y) => x + y),
    subtract: createBinaryExpression((x, y) => x - y),
    multiply: createBinaryExpression((x, y) => x * y),
    divide: createBinaryExpression((x, y) => x / y),
    
    composite: createCompositeExpression,
    when: createWhenExpression
};

