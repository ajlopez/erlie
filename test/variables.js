
const variables = require('../lib/variables');
const atoms = require('../lib/atoms');
const contexts = require('../lib/contexts');

exports['create variable'] = function (test) {
    const variable = variables.variable('Foo');
    
    test.ok(variable);
    test.strictEqual(typeof variable, 'object');
};

exports['variable to string'] = function (test) {
    const variable = variables.variable('Foo');
    
    test.strictEqual(variable.toString(), 'Foo');
};

exports['variable name'] = function (test) {
    const variable = variables.variable('Foo');
    
    test.strictEqual(variable.name(), 'Foo');
};

exports['is variable'] = function (test) {
    const variable = variables.variable('Foo');

    test.ok(variables.isVariable(variable));
    test.ok(!variables.isVariable(null));
    test.ok(!variables.isVariable(atoms.atom('foo')));
    test.ok(!variables.isVariable(42));
    test.ok(!variables.isVariable("foo"));
    test.ok(!variables.isVariable({}));
};

exports['evaluate unbound variable to itself'] = function (test) {
    const variable = variables.variable('X');
    const context = contexts.context();
    
    test.equal(variable.evaluate(context), variable);
};

exports['evaluate bound variable'] = function (test) {
    const variable = variables.variable('X');
    const context = contexts.context();
    
    context.bind(variable, 42);
    
    test.equal(variable.evaluate(context), 42);
};

