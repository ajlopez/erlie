
const erlie = require('..');
const atoms = require('../lib/atoms');
const variables = require('../lib/variables');

exports['evaluate constants'] = function (test) {
    test.strictEqual(erlie.evaluate('42'), 42);
    test.strictEqual(erlie.evaluate('"foo"'), "foo");
};

exports['evaluate atom'] = function (test) {
    const result = erlie.evaluate('foo');
    
    test.ok(result);
    test.ok(atoms.isAtom(result));
    test.equal(result.name(), 'foo');
};

exports['evaluate unbound variable'] = function (test) {
    const result = erlie.evaluate('X');
    
    test.ok(result);
    test.ok(variables.isVariable(result));
    test.equal(result.name(), 'X');
};


