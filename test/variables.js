
var variables = require('../lib/variables');
var atoms = require('../lib/atoms');
var contexts = require('../lib/contexts');

exports['create variable'] = function (test) {
    var variable = variables.variable('Foo');
    
    test.ok(variable);
    test.strictEqual(typeof variable, 'object');
};

exports['variable to string'] = function (test) {
    var variable = variables.variable('Foo');
    
    test.strictEqual(variable.toString(), 'Foo');
};

exports['variable name'] = function (test) {
    var variable = variables.variable('Foo');
    
    test.strictEqual(variable.name(), 'Foo');
};

exports['is variable'] = function (test) {
    var variable = variables.variable('Foo');

    test.ok(variables.isVariable(variable));
    test.ok(!variables.isVariable(null));
    test.ok(!variables.isVariable(atoms.atom('foo')));
    test.ok(!variables.isVariable(42));
    test.ok(!variables.isVariable("foo"));
    test.ok(!variables.isVariable({}));
};

exports['evaluate unbound variable to itself'] = function (test) {
    var variable = variables.variable('X');
    var context = contexts.context();
    
    test.equal(variable.evaluate(context), variable);
};

