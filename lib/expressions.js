
var atoms = require('./atoms');
var variables = require('./variables');
var tuples = require('./tuples');
var lists = require('./lists');
var contexts = require('./contexts');

var NoMatch = {};
var Async = {};

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
        var lvalue = context.evaluate(lexpr);
        
        if (variables.isVariable(lvalue))
            throw new Error("variable '" + lvalue.name() + "' is unbound");
        
        var rvalue = context.evaluate(rexpr);
        
        if (variables.isVariable(rvalue))
            throw new Error("variable '" + rvalue.name() + "' is unbound");
        
        return fn(lvalue, rvalue);
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

function TupleExpression(exprs) {
    this.evaluate = function (context) {
        var values = [];
        
        for (var k = 0; k < exprs.length; k++)
            values[k] = context.evaluate(exprs[k]);
        
        return tuples.tuple(values);
    };
}

function createTupleExpression(exprs) {
    return new TupleExpression(exprs);
}

function ListExpression() {
    this.evaluate = function (context) {
        return lists.empty();
    };
}

function createListExpression() {
    return new ListExpression();
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

function CallFunctionExpression(fn, argexprs) {
    this.evaluate = function (context) {
        return fn(context, context.evaluate(argexprs));
    };
}

function createCallExpression(fn, argexprs) {
    if (typeof fn === 'function')
        return new CallFunctionExpression(fn, argexprs);
    
    return new CallExpression(fn, argexprs);
}

function SendExpression(procexpr, msgexpr) {
    this.evaluate = function (context) {
        var process = context.evaluate(procexpr);
        var message = context.evaluate(msgexpr);
        
        process.send(message);
        
        return Async;
    };
}

function createSendExpression(procexpr, msgexpr) {
    return new SendExpression(procexpr, msgexpr);
}

function ReceiveExpression(fn) {
    this.evaluate = function (context) {
        context.process().receive(fn);
        
        return Async;
    };
};

function createReceiveExpression(fn) {
    return new ReceiveExpression(fn);
}

module.exports = {
    atom: atoms.atom,
    variable: variables.variable,
    constant: createConstantExpression,
    match: createMatchExpression,

    tuple: createTupleExpression,
    list: createListExpression,
    
    add: createBinaryExpression((x, y) => x + y),
    subtract: createBinaryExpression((x, y) => x - y),
    multiply: createBinaryExpression((x, y) => x * y),
    divide: createBinaryExpression((x, y) => x / y),

    div: createBinaryExpression((x, y) => Math.floor(x / y)),
    rem: createBinaryExpression((x, y) => x % y),
    
    composite: createCompositeExpression,
    when: createWhenExpression,
    function: createFunctionExpression,
    call: createCallExpression,
    
    send: createSendExpression,
    receive: createReceiveExpression,
    
    NoMatch: NoMatch,
    Async: Async
};

