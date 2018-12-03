
var x = require('../lib/expressions');
var contexts = require('../lib/contexts');
var atoms = require('../lib/atoms');
var variables = require('../lib/variables');
var processes = require('../lib/processes');

exports['atom expression'] = function (test) {
    var expr = x.atom('a');
    
    test.ok(expr);
    
    var result = expr.evaluate(null);
    
    test.ok(result);
    test.ok(atoms.isAtom(result));
    test.ok(result.equals(atoms.atom('a')));
};

exports['variable expression'] = function (test) {
    var expr = x.variable('X');
    var context = contexts.context();
  
    test.ok(expr);
    
    var result = expr.evaluate(context);
    
    test.ok(result);
    test.ok(variables.isVariable(result));
    test.ok(result.equals(variables.variable('X')));
};

exports['match expression'] = function (test) {
    var lexpr = x.variable('X');
    var rexpr = x.constant(42);
    
    var context = contexts.context();
    
    var expr = x.match(lexpr, rexpr);
    
    test.strictEqual(expr.evaluate(context), true);
    
    test.equal(context.resolve(variables.variable('X')), 42);
};

exports['add expression using constants'] = function (test) {
    var context = contexts.context();
    
    var expr = x.add(x.constant(40), x.constant(2));
    
    test.strictEqual(expr.evaluate(context), 42);
};

exports['add expression using variables'] = function (test) {
    var context = contexts.context();
    
    var varx = x.variable('X');
    var vary = x.variable('Y');
    
    context.bind(varx, 40);
    context.bind(vary, 2);
    
    var expr = x.add(varx, vary);
    
    test.strictEqual(expr.evaluate(context), 42);
};

exports['subtract expression using constants'] = function (test) {
    var context = contexts.context();
    
    var expr = x.subtract(x.constant(44), x.constant(2));
    
    test.strictEqual(expr.evaluate(context), 42);
};

exports['subtract expression using variables'] = function (test) {
    var context = contexts.context();
    
    var varx = x.variable('X');
    var vary = x.variable('Y');
    
    context.bind(varx, 44);
    context.bind(vary, 2);
    
    var expr = x.subtract(varx, vary);
    
    test.strictEqual(expr.evaluate(context), 42);
};

exports['multiply expression using constants'] = function (test) {
    var context = contexts.context();
    
    var expr = x.multiply(x.constant(21), x.constant(2));
    
    test.strictEqual(expr.evaluate(context), 42);
};

exports['multiply expression using variables'] = function (test) {
    var context = contexts.context();
    
    var varx = x.variable('X');
    var vary = x.variable('Y');
    
    context.bind(varx, 21);
    context.bind(vary, 2);
    
    var expr = x.multiply(varx, vary);
    
    test.strictEqual(expr.evaluate(context), 42);
};

exports['divide expression using constants'] = function (test) {
    var context = contexts.context();
    
    var expr = x.divide(x.constant(84), x.constant(2));
    
    test.strictEqual(expr.evaluate(context), 42);
};

exports['divide expression using variables'] = function (test) {
    var context = contexts.context();
    
    var varx = x.variable('X');
    var vary = x.variable('Y');
    
    context.bind(varx, 84);
    context.bind(vary, 2);
    
    var expr = x.divide(varx, vary);
    
    test.strictEqual(expr.evaluate(context), 42);
};

exports['composite expression using constants'] = function (test) {
    var context = contexts.context();
    
    var expr = x.composite([ x.constant(1), x.constant(4), x.constant(9) ]);
    
    test.strictEqual(expr.evaluate(context), 9);
};

exports['composite expression using variables'] = function (test) {
    var context = contexts.context();

    var varx = x.variable('X');
    var vary = x.variable('Y');
    var varz = x.variable('Z');
    
    context.bind(varx, 1);
    context.bind(vary, 4);
    context.bind(varz, 9);
    
    var expr = x.composite([ x.constant(1), x.constant(4), x.constant(9) ]);
    
    test.strictEqual(expr.evaluate(context), 9);
};

exports['when expression with simple variable'] = function (test) {
    var context = contexts.context();

    var varx = x.variable('X');
    
    var expr = x.when(x.variable('X'), x.variable('X'));
    
    test.strictEqual(expr.evaluate(context, 42), 42);
    
    test.strictEqual(context.resolve(varx), varx);
};

exports['when expression no match'] = function (test) {
    var context = contexts.context();

    var varx = x.variable('X');
    
    var expr = x.when([ x.variable('X') ], x.variable('X'));
    
    test.strictEqual(expr.evaluate(context, 42), x.NoMatch);
    
    test.strictEqual(context.resolve(varx), varx);
};

exports['function with no argument'] = function (test) {
    var context = contexts.context();

    var expr = x.function([], x.constant(42));
    test.equal(expr.arity(), 0);
    
    test.strictEqual(expr.evaluate(context, []), 42);
};

exports['function with one argument'] = function (test) {
    var context = contexts.context();
    
    var varx = x.variable('X');
    
    var expr = x.function([ varx ], varx );
    test.equal(expr.arity(), 1);
    
    test.strictEqual(expr.evaluate(context, [ 42 ]), 42);
    
    test.strictEqual(context.resolve(varx), varx);
};

exports['function with two arguments'] = function (test) {
    var context = contexts.context();

    var varx = x.variable('X');
    var vary = x.variable('Y');
    
    var expr = x.function([ varx, vary ], x.multiply(varx, vary) );
    test.equal(expr.arity(), 2);
    
    test.strictEqual(expr.evaluate(context, [ 21, 2 ]), 42);
    
    test.strictEqual(context.resolve(varx), varx);
    test.strictEqual(context.resolve(vary), vary);
};

exports['function no match'] = function (test) {
    var context = contexts.context();

    var varx = x.variable('X');
    var vary = x.variable('Y');
    
    var expr = x.function([ varx, vary ], x.multiply(varx, vary) );
    test.equal(expr.arity(), 2);
    
    test.strictEqual(expr.evaluate(context, [ 42 ]), x.NoMatch);
    
    test.strictEqual(context.resolve(varx), varx);
    test.strictEqual(context.resolve(vary), vary);
};

exports['call expression'] = function (test) {
    var context = contexts.context();

    var varx = x.variable('X');
    var vary = x.variable('Y');
    var varz = x.variable('Z');

    context.bind(varz, 21);
    
    var fn = x.function([ varx, vary ], x.multiply(varx, vary) );
    
    var expr = x.call(fn, [ varz, 2 ]);
    
    test.strictEqual(expr.evaluate(context), 42);
    
    test.strictEqual(context.resolve(varx), varx);
    test.strictEqual(context.resolve(vary), vary);
    test.strictEqual(context.resolve(varz), 21);
};

exports['call expression using native expression'] = function (test) {
    var context = contexts.context();

    var varx = x.variable('X');
    var vary = x.variable('Y');
    var varz = x.variable('Z');

    context.bind(varz, 21);
    
    var rcontext;
    var rargs;
    
    function fn(context, args) {
        rcontext = context;
        rargs = args;
        return args[0] * args[1];
    }
    
    var expr = x.call(fn, [ varz, 2 ]);
    
    test.strictEqual(expr.evaluate(context), 42);
    
    test.strictEqual(rcontext, context);
    test.ok(rargs);
    test.equal(rargs.length, 2);
    test.equal(rargs[0], 21);
    test.equal(rargs[1], 2);
    
    test.strictEqual(context.resolve(varx), varx);
    test.strictEqual(context.resolve(vary), vary);
    test.strictEqual(context.resolve(varz), 21);
};

exports['send expression']  = function (test) {
    test.async();
    
    var process = processes.process();
    var varx = x.variable('X');
    
    var context = contexts.context();
  
    context.bind(varx, process);
    
    var expr = x.send(varx, x.constant(42));
    
    test.strictEqual(expr.evaluate(context), x.Async);
    
    process.receive(function (data) {
        test.strictEqual(data, 42);
        test.done();
    });
};

exports['receive expression']  = function (test) {
    test.async();
    
    var process = processes.process();
    var context = contexts.context({ process: process });
    
    process.send(42);
    
    var expr = x.receive(function (data) {
        test.strictEqual(data, 42);
        test.done();
    });
    
    test.strictEqual(expr.evaluate(context), x.Async);
};

