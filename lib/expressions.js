
var atoms = require('./atoms');
var variables = require('./variables');
var contexts = require('./contexts');

var NoMatch = {};

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
        var newcontext = contexts.context(context);
        
        if (newcontext.match(context.evaluate(matchexpr), arg))
            return newcontext.evaluate(expr);
        
        return NoMatch;
    };
}

function createWhenExpression(matchexpr, expr) {
    return new WhenExpression(matchexpr, expr);
}

function FunctionExpression(args, expr) {
    this.arity = function () { return args.length; };
    
    this.evaluate = function (context, as) {
        var newcontext = contexts.context();
        
        if (newcontext.match(args, as))
            return newcontext.evaluate(expr);
        
        return NoMatch;
    };
}

function createFunctionExpression(args, expr) {
    return new FunctionExpression(args, expr);
}

function CallExpression(fn, argexprs) {
    this.evaluate = function (context) {
        return fn.evaluate(context, context.evaluate(argexprs));
    };
}

function createCallExpression(fn, argexprs) {
    return new CallExpression(fn, argexprs);
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
    when: createWhenExpression,
    function: createFunctionExpression,
    call: createCallExpression,
    
    NoMatch: NoMatch
};

