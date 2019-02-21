
const x = require('../lib/expressions');
const contexts = require('../lib/contexts');
const atoms = require('../lib/atoms');
const variables = require('../lib/variables');
const tuples = require('../lib/tuples');
const processes = require('../lib/processes');

exports['atom expression'] = function (test) {
    const expr = x.atom('a');
    
    test.ok(expr);
    
    const result = expr.evaluate(null);
    
    test.ok(result);
    test.ok(atoms.isAtom(result));
    test.ok(result.equals(atoms.atom('a')));
};

exports['variable expression'] = function (test) {
    const expr = x.variable('X');
    const context = contexts.context();
  
    test.ok(expr);
    
    const result = expr.evaluate(context);
    
    test.ok(result);
    test.ok(variables.isVariable(result));
    test.ok(result.equals(variables.variable('X')));
};

exports['match expression'] = function (test) {
    const lexpr = x.variable('X');
    const rexpr = x.constant(42);
    
    const context = contexts.context();
    
    const expr = x.match(lexpr, rexpr);
    
    test.strictEqual(expr.evaluate(context), true);
    
    test.equal(context.resolve(variables.variable('X')), 42);
};

exports['add expression using constants'] = function (test) {
    const context = contexts.context();
    
    const expr = x.add(x.constant(40), x.constant(2));
    
    test.strictEqual(expr.evaluate(context), 42);
};

exports['add expression using variables'] = function (test) {
    const context = contexts.context();
    
    const varx = x.variable('X');
    const vary = x.variable('Y');
    
    context.bind(varx, 40);
    context.bind(vary, 2);
    
    const expr = x.add(varx, vary);
    
    test.strictEqual(expr.evaluate(context), 42);
};

exports['add expression using unbound left variable'] = function (test) {
    const context = contexts.context();
    
    const varx = x.variable('X');
    const vary = x.variable('Y');
    
    context.bind(vary, 2);

    const expr = x.add(varx, vary);

    try {
        expr.evaluate(context);
    }
    catch (ex) {
        test.equal(ex, "Error: variable 'X' is unbound");
        return;
    }
    
    test.fail();
};

exports['add expression using unbound right variable'] = function (test) {
    const context = contexts.context();
    
    const varx = x.variable('X');
    const vary = x.variable('Y');
    
    context.bind(varx, 40);

    const expr = x.add(varx, vary);

    try {
        expr.evaluate(context);
    }
    catch (ex) {
        test.equal(ex, "Error: variable 'Y' is unbound");
        return;
    }
    
    test.fail();
};

exports['subtract expression using constants'] = function (test) {
    const context = contexts.context();
    
    const expr = x.subtract(x.constant(44), x.constant(2));
    
    test.strictEqual(expr.evaluate(context), 42);
};

exports['subtract expression using variables'] = function (test) {
    const context = contexts.context();
    
    const varx = x.variable('X');
    const vary = x.variable('Y');
    
    context.bind(varx, 44);
    context.bind(vary, 2);
    
    const expr = x.subtract(varx, vary);
    
    test.strictEqual(expr.evaluate(context), 42);
};

exports['multiply expression using constants'] = function (test) {
    const context = contexts.context();
    
    const expr = x.multiply(x.constant(21), x.constant(2));
    
    test.strictEqual(expr.evaluate(context), 42);
};

exports['multiply expression using variables'] = function (test) {
    const context = contexts.context();
    
    const varx = x.variable('X');
    const vary = x.variable('Y');
    
    context.bind(varx, 21);
    context.bind(vary, 2);
    
    const expr = x.multiply(varx, vary);
    
    test.strictEqual(expr.evaluate(context), 42);
};

exports['divide expression using constants'] = function (test) {
    const context = contexts.context();
    
    const expr = x.divide(x.constant(84), x.constant(2));
    
    test.strictEqual(expr.evaluate(context), 42);
};

exports['divide expression using variables'] = function (test) {
    const context = contexts.context();
    
    const varx = x.variable('X');
    const vary = x.variable('Y');
    
    context.bind(varx, 84);
    context.bind(vary, 2);
    
    const expr = x.divide(varx, vary);
    
    test.strictEqual(expr.evaluate(context), 42);
};

exports['div expression using constants'] = function (test) {
    const context = contexts.context();
    
    const expr = x.div(x.constant(84), x.constant(5));
    
    test.strictEqual(expr.evaluate(context), 16);
};

exports['div expression using variables'] = function (test) {
    const context = contexts.context();
    
    const varx = x.variable('X');
    const vary = x.variable('Y');
    
    context.bind(varx, 84);
    context.bind(vary, 5);
    
    const expr = x.div(varx, vary);
    
    test.strictEqual(expr.evaluate(context), 16);
};

exports['rem expression using constants'] = function (test) {
    const context = contexts.context();
    
    const expr = x.rem(x.constant(84), x.constant(5));
    
    test.strictEqual(expr.evaluate(context), 4);
};

exports['rem expression using variables'] = function (test) {
    const context = contexts.context();
    
    const varx = x.variable('X');
    const vary = x.variable('Y');
    
    context.bind(varx, 84);
    context.bind(vary, 5);
    
    const expr = x.rem(varx, vary);
    
    test.strictEqual(expr.evaluate(context), 4);
};

exports['composite expression using constants'] = function (test) {
    const context = contexts.context();
    
    const expr = x.composite([ x.constant(1), x.constant(4), x.constant(9) ]);
    
    test.strictEqual(expr.evaluate(context), 9);
};

exports['composite expression using variables'] = function (test) {
    const context = contexts.context();

    const varx = x.variable('X');
    const vary = x.variable('Y');
    const varz = x.variable('Z');
    
    context.bind(varx, 1);
    context.bind(vary, 4);
    context.bind(varz, 9);
    
    const expr = x.composite([ varx, vary, varz ]);
    
    test.strictEqual(expr.evaluate(context), 9);
};

exports['tuple expression using constants'] = function (test) {
    const context = contexts.context();
    
    const expr = x.tuple([ x.constant(1), x.constant(4), x.constant(9) ]);
    const result = expr.evaluate(context);
    
    test.ok(result);
    test.ok(tuples.tuple(result));
    test.ok(result.equals(tuples.tuple([1, 4, 9])));
};

exports['tuple expression using variables'] = function (test) {
    const context = contexts.context();

    const varx = x.variable('X');
    const vary = x.variable('Y');
    const varz = x.variable('Z');
    
    context.bind(varx, 1);
    context.bind(vary, 4);
    context.bind(varz, 9);
    
    const expr = x.tuple([ varx, vary, varz ]);
    const result = expr.evaluate(context);
    
    test.ok(result);
    test.ok(tuples.tuple(result));
    test.ok(result.equals(tuples.tuple([1, 4, 9])));
};

exports['when expression with simple variable'] = function (test) {
    const context = contexts.context();

    const varx = x.variable('X');
    
    const expr = x.when(x.variable('X'), x.variable('X'));
    
    test.strictEqual(expr.evaluate(context, 42), 42);
    
    test.strictEqual(context.resolve(varx), varx);
};

exports['when expression no match'] = function (test) {
    const context = contexts.context();

    const varx = x.variable('X');
    
    const expr = x.when([ x.variable('X') ], x.variable('X'));
    
    test.strictEqual(expr.evaluate(context, 42), x.NoMatch);
    
    test.strictEqual(context.resolve(varx), varx);
};

exports['function with no argument'] = function (test) {
    const context = contexts.context();

    const expr = x.function([], x.constant(42));
    test.equal(expr.arity(), 0);
    
    test.strictEqual(expr.evaluate(context, []), 42);
};

exports['function with one argument'] = function (test) {
    const context = contexts.context();
    
    const varx = x.variable('X');
    
    const expr = x.function([ varx ], varx );
    test.equal(expr.arity(), 1);
    
    test.strictEqual(expr.evaluate(context, [ 42 ]), 42);
    
    test.strictEqual(context.resolve(varx), varx);
};

exports['function with two arguments'] = function (test) {
    const context = contexts.context();

    const varx = x.variable('X');
    const vary = x.variable('Y');
    
    const expr = x.function([ varx, vary ], x.multiply(varx, vary) );
    test.equal(expr.arity(), 2);
    
    test.strictEqual(expr.evaluate(context, [ 21, 2 ]), 42);
    
    test.strictEqual(context.resolve(varx), varx);
    test.strictEqual(context.resolve(vary), vary);
};

exports['function no match'] = function (test) {
    const context = contexts.context();

    const varx = x.variable('X');
    const vary = x.variable('Y');
    
    const expr = x.function([ varx, vary ], x.multiply(varx, vary) );
    test.equal(expr.arity(), 2);
    
    test.strictEqual(expr.evaluate(context, [ 42 ]), x.NoMatch);
    
    test.strictEqual(context.resolve(varx), varx);
    test.strictEqual(context.resolve(vary), vary);
};

exports['call expression'] = function (test) {
    const context = contexts.context();

    const varx = x.variable('X');
    const vary = x.variable('Y');
    const varz = x.variable('Z');

    context.bind(varz, 21);
    
    const fn = x.function([ varx, vary ], x.multiply(varx, vary) );
    
    const expr = x.call(fn, [ varz, 2 ]);
    
    test.strictEqual(expr.evaluate(context), 42);
    
    test.strictEqual(context.resolve(varx), varx);
    test.strictEqual(context.resolve(vary), vary);
    test.strictEqual(context.resolve(varz), 21);
};

exports['call expression using native expression'] = function (test) {
    const context = contexts.context();

    const varx = x.variable('X');
    const vary = x.variable('Y');
    const varz = x.variable('Z');

    context.bind(varz, 21);
    
    var rcontext;
    var rargs;
    
    function fn(context, args) {
        rcontext = context;
        rargs = args;
        return args[0] * args[1];
    }
    
    const expr = x.call(fn, [ varz, 2 ]);
    
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
    
    const process = processes.process();
    const varx = x.variable('X');
    
    const context = contexts.context();
  
    context.bind(varx, process);
    
    const expr = x.send(varx, x.constant(42));
    
    test.strictEqual(expr.evaluate(context), x.Async);
    
    process.receive(function (data) {
        test.strictEqual(data, 42);
        test.done();
    });
};

exports['receive expression']  = function (test) {
    test.async();
    
    const process = processes.process();
    const context = contexts.context({ process: process });
    
    process.send(42);
    
    const expr = x.receive(function (data) {
        test.strictEqual(data, 42);
        test.done();
    });
    
    test.strictEqual(expr.evaluate(context), x.Async);
};

