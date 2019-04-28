
const interpreter = require('../lib/interpreter');
const parsers = require('../lib/parsers');
const atoms = require('../lib/atoms');
const variables = require('../lib/variables');
const contexts = require('../lib/contexts');

function process(text, context) {
    const node = parsers.parse('expression', text);
    return interpreter.process(node, context);
}

exports['process constants'] = function (test) {
    test.strictEqual(process('42'), 42);
    test.strictEqual(process('"foo"'), "foo");
};

exports['process atom'] = function (test) {
    const result = process('foo');
    
    test.ok(result);
    test.ok(atoms.isAtom(result));
    test.equal(result.name(), 'foo');
};

exports['process unbound variable'] = function (test) {
    const result = process('X');
    
    test.ok(result);
    test.ok(variables.isVariable(result));
    test.equal(result.name(), 'X');
};

exports['process bound variable'] = function (test) {
    const context = contexts.context();
    context.bind(variables.variable('X'), 42);
    const result = process('X', context);
    
    test.ok(result);
    test.strictEqual(result, 42);
};

exports['process match unbound variable'] = function (test) {
    const context = contexts.context();
    
    test.strictEqual(process('X = 42', context), true);
    
    const result = process('X', context);
    
    test.ok(result);
    test.strictEqual(result, 42);
};

exports['process match already bound variable'] = function (test) {
    const context = contexts.context();
    context.bind(variables.variable('X'), 42);
    test.strictEqual(process('X = 1', context), false);
    
    const result = process('X', context);
    
    test.ok(result);
    test.strictEqual(result, 42);
};

