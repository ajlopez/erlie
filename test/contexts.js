
const contexts = require('../lib/contexts');
const atoms = require('../lib/atoms');
const variables = require('../lib/variables');
const tuples = require('../lib/tuples');
const lists = require('../lib/lists');
const processes = require('../lib/processes');

exports['create context'] = function (test) {
    const context = contexts.context();
    
    test.ok(context);
    test.equal(typeof context, 'object');
    
    test.equal(context.parent(), null);
    test.equal(context.process(), null);
};

exports['define function with name and arity'] = function (test) {
    const context = contexts.context();
    const fn = Math.sin;
    
    context.fun('sin', 1, fn);
    
    const result = context.fun('sin', 1);
    
    test.ok(result);
    test.equal(result, fn);
};

exports['get undefined function'] = function (test) {
    const context = contexts.context();
    
    test.equal(context.fun('sin', 1), null);
};

exports['resolve unbound variable'] = function (test) {
    const varx = variables.variable('X');
    const context = contexts.context();
    
    test.equal(context.resolve(varx), varx);
};

exports['bind and resolve variable using integer value'] = function (test) {
    const varx = variables.variable('X');
    const context = contexts.context();
    
    context.bind(varx, 42);
    
    test.equal(context.resolve(varx), 42);
};

exports['bind and resolve variable using variable and integer value'] = function (test) {
    const varx = variables.variable('X');
    const vary = variables.variable('Y');
    
    const context = contexts.context();
    
    context.bind(varx, vary);
    context.bind(vary, 42);
    
    test.equal(context.resolve(varx), 42);
    test.equal(context.resolve(vary), 42);
};

exports['cannot bind a variable twice'] = function (test) {
    const varx = variables.variable('X');
    const context = contexts.context();
    
    context.bind(varx, 42);
    
    try {
        context.bind(varx, 144);
    }
    catch (ex) {
        test.equal(ex, 'Error: already bound variable');
        return;
    }
    
    test.fail('Test failed');
};

exports['bind and resolve variable using variable value'] = function (test) {
    const varx = variables.variable('X');
    const vary = variables.variable('Y');
    
    const context = contexts.context();
    
    context.bind(varx, vary);
    
    test.equal(context.resolve(varx), vary);
};

exports['match simple values'] = function (test) {
    const context = contexts.context();
    
    test.ok(context.match(42, 42));
    test.ok(context.match("foo", "foo"));
    test.ok(context.match(null, null));
    test.ok(context.match(false, false));
    test.ok(context.match(true, true));

    test.ok(!context.match(42, "42"));
    test.ok(!context.match("foo", "bar"));
    test.ok(!context.match(null, false));
    test.ok(!context.match(false, true));
    test.ok(!context.match(true, false));
};

exports['match atoms'] = function (test) {
    const context = contexts.context();
    
    const atom1 = atoms.atom('a');
    const atom2 = atoms.atom('a');
    const atom3 = atoms.atom('b');
    
    test.ok(context.match(atom1, atom1));
    test.ok(context.match(atom1, atom2));
    test.ok(context.match(atom2, atom1));
    test.ok(context.match(atom2, atom2));
    test.ok(context.match(atom3, atom3));

    test.ok(!context.match(atom1, atom3));
    test.ok(!context.match(atom2, atom3));
    test.ok(!context.match(atom3, atom1));
    test.ok(!context.match(atom3, atom2));
};

exports['match unbound variable'] = function (test) {
    const context = contexts.context();
    const varx = variables.variable('X');
    
    test.equal(context.resolve(varx), varx);
    
    test.ok(context.match(varx, 42));
    
    test.equal(context.resolve(varx), 42);
};

exports['match unbound variable to integer value'] = function (test) {
    const context = contexts.context();
    const varx = variables.variable('X');
    
    test.equal(context.resolve(varx), varx);
    
    test.ok(context.match(varx, 42));
    
    test.equal(context.resolve(varx), 42);
};

exports['match unbound variable to another variable'] = function (test) {
    const context = contexts.context();
    const varx = variables.variable('X');
    const vary = variables.variable('Y');
    
    test.equal(context.resolve(varx), varx);
    
    test.ok(context.match(varx, vary));
    
    test.equal(context.resolve(varx), vary);
};

exports['match two tuples with constant values'] = function (test) {
    const context = contexts.context();
    
    const tuple1 = tuples.tuple([1, 4, 9]);
    const tuple2 = tuples.tuple([1, 4, 9]);
    
    test.ok(context.match(tuple1, tuple2));
};

exports['match tuple with variables with tuple with constant values'] = function (test) {
    const context = contexts.context();

    const varx = variables.variable('X');
    const vary = variables.variable('Y');
    const varz = variables.variable('Z');
    
    const tuple1 = tuples.tuple([varx, vary, varz]);
    const tuple2 = tuples.tuple([1, 4, 9]);
    
    test.ok(context.match(tuple1, tuple2));
    
    test.equal(context.resolve(varx), 1);
    test.equal(context.resolve(vary), 4);
    test.equal(context.resolve(varz), 9);
};

exports['match tuple with repeated variable with tuple with constant values'] = function (test) {
    const context = contexts.context();

    const varx = variables.variable('X');
    const vary = variables.variable('Y');
    
    const tuple1 = tuples.tuple([varx, vary, vary]);
    const tuple2 = tuples.tuple([1, 4, 4]);
    
    test.ok(context.match(tuple1, tuple2));
    
    test.equal(context.resolve(varx), 1);
    test.equal(context.resolve(vary), 4);
};

exports['match tuples with interchanged variables'] = function (test) {
    const context = contexts.context();

    const varx = variables.variable('X');
    const vary = variables.variable('Y');
    
    const tuple1 = tuples.tuple([varx, vary, varx]);
    const tuple2 = tuples.tuple([vary, varx, 42]);
    
    test.ok(context.match(tuple1, tuple2));
    
    test.equal(context.resolve(varx), 42);
    test.equal(context.resolve(vary), 42);
};

exports['does not match tuples and retract processed variable bindings'] = function (test) {
    const context = contexts.context();

    const varx = variables.variable('X');
    const vary = variables.variable('Y');
    
    const tuple1 = tuples.tuple([varx, vary, varx, vary]);
    const tuple2 = tuples.tuple([vary, varx, 42, 43]);
    
    test.ok(!context.match(tuple1, tuple2));
    
    test.equal(context.resolve(varx), varx);
    test.equal(context.resolve(vary), vary);
};

exports['does not match tuples and retract processed variable bindings even the nested ones'] = function (test) {
    const context = contexts.context();

    const varx = variables.variable('X');
    
    const tuple1 = tuples.tuple([ tuples.tuple([ varx ]), varx ]);
    const tuple2 = tuples.tuple([ tuples.tuple([ 42 ]), 1 ]);
    
    test.ok(!context.match(tuple1, tuple2));
    
    test.equal(context.resolve(varx), varx);
};

exports['does not match two tuples with different sizes'] = function (test) {
    const context = contexts.context();
    
    const tuple1 = tuples.tuple([1, 4, 9]);
    const tuple2 = tuples.tuple([1, 4]);
    
    test.ok(!context.match(tuple1, tuple2));
};

exports['does not match two tuples with same size and different values'] = function (test) {
    const context = contexts.context();
    
    const tuple1 = tuples.tuple([1, 4, 9]);
    const tuple2 = tuples.tuple([1, 2, 3]);
    
    test.ok(!context.match(tuple1, tuple2));
};

exports['match arrays with constants'] = function (test) {
    const context = contexts.context();
    
    test.ok(context.match([], []));
    test.ok(context.match([ 1 ], [ 1 ]));
    test.ok(context.match([ 1, 4, 9 ], [ 1, 4, 9 ]));
    
    test.ok(!context.match([], 42));
    test.ok(!context.match([], [ 1 ]));
    test.ok(!context.match([ 1 ], [ 2 ]));
    test.ok(!context.match([ 1, 4, 9 ], [ 1, 4, 4 ]));
};

exports['match arrays with variables'] = function (test) {
    const context = contexts.context();

    const varx = variables.variable('X');
    const vary = variables.variable('Y');
    const varz = variables.variable('Z');
    
    test.ok(context.match([ varx, vary, varz ], [ 1, 4, 9 ]));

    test.equal(context.resolve(varx), 1);
    test.equal(context.resolve(vary), 4);
    test.equal(context.resolve(varz), 9);
};

exports['does not match arrays with variables'] = function (test) {
    const context = contexts.context();

    const varx = variables.variable('X');
    const vary = variables.variable('Y');
    
    test.ok(!context.match([ varx, vary, varx ], [ 1, 4, 9 ]));

    test.equal(context.resolve(varx), varx);
    test.equal(context.resolve(vary), vary);
};

exports['bind variable in child context'] = function (test) {
    const parent = contexts.context();
    const context = contexts.context(parent);
    
    test.ok(context.parent());
    test.strictEqual(context.parent(), parent);
    
    const varx = variables.variable('X');
    
    context.bind(varx, 42);
    
    test.strictEqual(context.resolve(varx), 42);
    test.strictEqual(parent.resolve(varx), varx);
};

exports['bind variable in parent context'] = function (test) {
    const parent = contexts.context();
    const context = contexts.context(parent);
    
    test.ok(context.parent());
    test.strictEqual(context.parent(), parent);
    
    const varx = variables.variable('X');
    
    parent.bind(varx, 42);
    
    test.strictEqual(context.resolve(varx), 42);
    test.strictEqual(parent.resolve(varx), 42);
};

exports['context with process'] = function (test) {
    const process = processes.process();
    
    const context = contexts.context({ process: process });
    
    test.equal(context.parent(), null);
    test.strictEqual(context.process(), process);
};

exports['context with parent and process'] = function (test) {
    const process = processes.process();
    const parent = contexts.context();
    
    const context = contexts.context(parent, { process: process });
    
    test.strictEqual(context.parent(), parent);
    test.strictEqual(context.process(), process);
};

exports['match two lists with constant values'] = function (test) {
    const context = contexts.context();
    
    const list1 = lists.list(1, lists.list(4, lists.list(9)));
    const list2 = lists.list(1, lists.list(4, lists.list(9)));
    
    test.ok(context.match(list1, list2));
};

exports['match list with variables with list with constant values'] = function (test) {
    const context = contexts.context();

    const varx = variables.variable('X');
    const vary = variables.variable('Y');
    const varz = variables.variable('Z');
    
    const list1 = lists.list(varx, lists.list(vary, lists.list(varz)));
    const list2 = lists.list(1, lists.list(4, lists.list(9)));
    
    test.ok(context.match(list1, list2));
    
    test.equal(context.resolve(varx), 1);
    test.equal(context.resolve(vary), 4);
    test.equal(context.resolve(varz), 9);
};

exports['match list with repeated variable with list with constant values'] = function (test) {
    const context = contexts.context();

    const varx = variables.variable('X');
    const vary = variables.variable('Y');
    
    const list1 = lists.list(varx, lists.list(vary, lists.list(vary)));
    const list2 = lists.list(1, lists.list(4, lists.list(4)));
    
    test.ok(context.match(list1, list2));
    
    test.equal(context.resolve(varx), 1);
    test.equal(context.resolve(vary), 4);
};

exports['match lists with interchanged variables'] = function (test) {
    const context = contexts.context();

    const varx = variables.variable('X');
    const vary = variables.variable('Y');
    
    const list1 = lists.list(varx, lists.list(vary, lists.list(varx)));
    const list2 = lists.list(vary, lists.list(varx, lists.list(42)));
    
    test.ok(context.match(list1, list2));
    
    test.equal(context.resolve(varx), 42);
    test.equal(context.resolve(vary), 42);
};

exports['does not match lists and retract processed variable bindings'] = function (test) {
    const context = contexts.context();

    const varx = variables.variable('X');
    const vary = variables.variable('Y');
    
    const list1 = lists.list(varx, lists.list(vary, lists.list(varx, lists.list(vary))));
    const list2 = lists.list(vary, lists.list(varx, lists.list(42, lists.list(43))));
    
    test.ok(!context.match(list1, list2));
    
    test.equal(context.resolve(varx), varx);
    test.equal(context.resolve(vary), vary);
};

exports['does not match lists and retract processed variable bindings even the nested ones'] = function (test) {
    const context = contexts.context();

    const varx = variables.variable('X');
    
    const list1 = lists.list(lists.list(varx), lists.list(varx));
    const list2 = lists.list(lists.list(42), lists.list(1));
    
    test.ok(!context.match(list1, list2));
    
    test.equal(context.resolve(varx), varx);
};

exports['does not match two lists with different sizes'] = function (test) {
    const context = contexts.context();
    
    const list1 = lists.list(1, lists.list(4, lists.list(9)));
    const list2 = lists.list(1, lists.list(4));
    
    test.ok(!context.match(list1, list2));
};

exports['does not match two lists with same size and different values'] = function (test) {
    const context = contexts.context();
    
    const list1 = lists.list(1, lists.list(4, lists.list(9)));
    const list2 = lists.list(1, lists.list(2, lists.list(3)));
    
    test.ok(!context.match(list1, list2));
};
