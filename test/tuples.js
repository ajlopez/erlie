
const tuples = require('../lib/tuples');
const contexts = require('../lib/contexts');
const variables = require('../lib/variables');

exports['is tuple'] = function (test) {
    test.ok(tuples.isTuple(tuples.tuple([])));
    test.ok(tuples.isTuple(tuples.tuple([1, 2, 3])));

    test.ok(!tuples.isTuple(undefined));
    test.ok(!tuples.isTuple(null));
    test.ok(!tuples.isTuple(42));
    test.ok(!tuples.isTuple("foo"));
    test.ok(!tuples.isTuple(false));
    test.ok(!tuples.isTuple(true));
    test.ok(!tuples.isTuple([1, 2, 3]));
};

exports['create empty tuple'] = function (test) {
    const tuple = tuples.tuple([]);
    
    test.ok(tuple);
    test.equal(typeof tuple, 'object');
    test.equal(tuple.size(), 0);
};

exports['create tuple with three elements'] = function (test) {
    var tuple = tuples.tuple([1, 4, 9]);
    
    test.ok(tuple);
    test.equal(typeof tuple, 'object');
    test.equal(tuple.size(), 3);
    test.equal(tuple.element(0), 1);
    test.equal(tuple.element(1), 4);
    test.equal(tuple.element(2), 9);
};

exports['evaluate tuple with three constants elements'] = function (test) {
    var context = contexts.context();
    var tuple = tuples.tuple([1, 4, 9]);

    var result = tuple.evaluate(context);
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.ok(tuples.isTuple(result));

    test.equal(result.size(), 3);
    test.equal(result.element(0), 1);
    test.equal(result.element(1), 4);
    test.equal(result.element(2), 9);
};

exports['evaluate tuple with three unbound variables'] = function (test) {
    var context = contexts.context();
    var varx = variables.variable('X');
    var vary = variables.variable('Y');
    var varz = variables.variable('Z');
    
    var tuple = tuples.tuple([varx, vary, varz]);

    var result = tuple.evaluate(context);
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.ok(tuples.isTuple(result));

    test.equal(result.size(), 3);
    test.equal(result.element(0), varx);
    test.equal(result.element(1), vary);
    test.equal(result.element(2), varz);
};

exports['evaluate tuple with three bound variables'] = function (test) {
    var context = contexts.context();
    var varx = variables.variable('X');
    var vary = variables.variable('Y');
    var varz = variables.variable('Z');
    
    var tuple = tuples.tuple([varx, vary, varz]);

    context.bind(varx, 1);
    context.bind(vary, 4);
    context.bind(varz, 9);
    
    var result = tuple.evaluate(context);
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.ok(tuples.isTuple(result));

    test.equal(result.size(), 3);
    test.equal(result.element(0), 1);
    test.equal(result.element(1), 4);
    test.equal(result.element(2), 9);
};

exports['equals'] = function (test) {
    test.ok(tuples.tuple([]).equals(tuples.tuple([])));
    test.ok(tuples.tuple([42]).equals(tuples.tuple([42])));
    test.ok(tuples.tuple([1, 2, 3]).equals(tuples.tuple([1, 2, 3])));
    test.ok(tuples.tuple([tuples.tuple([1]), tuples.tuple([2]), tuples.tuple([3])]).equals(tuples.tuple([tuples.tuple([1]), tuples.tuple([2]), tuples.tuple([3])])));

    test.ok(!tuples.tuple([]).equals(tuples.tuple([1])));
    test.ok(!tuples.tuple([42]).equals(tuples.tuple([1])));
    test.ok(!tuples.tuple([1, 2, 3]).equals(tuples.tuple([1, 2, 3, 4])));
    test.ok(!tuples.tuple([tuples.tuple([1]), tuples.tuple([2]), tuples.tuple([3])]).equals(tuples.tuple([tuples.tuple([1]), tuples.tuple([2]), tuples.tuple([4])])));

    test.ok(!tuples.tuple([]).equals(null));
    test.ok(!tuples.tuple([]).equals(42));
    test.ok(!tuples.tuple([]).equals("foo"));
    test.ok(!tuples.tuple([]).equals(variables.variable('X')));
};

