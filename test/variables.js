
var variables = require('../lib/variables');
var atoms = require('../lib/atoms');

exports['create variable'] = function (test) {
    var variable = variables.variable('foo');
    
    test.ok(variable);
    test.strictEqual(typeof variable, 'object');
};

exports['variable to string'] = function (test) {
    var variable = variables.variable('foo');
    
    test.strictEqual(variable.toString(), 'foo');
};

exports['variable name'] = function (test) {
    var variable = variables.variable('foo');
    
    test.strictEqual(variable.name(), 'foo');
};

exports['is variable'] = function (test) {
    var variable = variables.variable('foo');

    test.ok(variables.isVariable(variable));
    test.ok(!variables.isVariable(null));
    test.ok(!variables.isVariable(atoms.atom('foo')));
    test.ok(!variables.isVariable(42));
    test.ok(!variables.isVariable("foo"));
    test.ok(!variables.isVariable({}));
};

