
const parsers = require('../lib/parsers');

exports['parse integer constant'] = function (test) {
    const result = parsers.parse('term', '42');
    
    test.ok(result);
    test.equal(result.ntype(), 'constant');
    test.equal(result.value(), 42);
};

exports['parse string constant'] = function (test) {
    const result = parsers.parse('term', '"foo"');
    
    test.equal(result.ntype(), 'constant');
    test.equal(result.value(), "foo");
};

exports['parse atom'] = function (test) {
    const result = parsers.parse('term', 'foo');
    
    test.ok(result);
    test.equal(result.ntype(), 'atom');
    test.equal(result.name(), 'foo');
};

exports['parse variable starting with uppercase letter'] = function (test) {
    const result = parsers.parse('term', 'X');
    
    test.ok(result);
    test.equal(result.ntype(), 'variable');
    test.equal(result.name(), 'X');
};

exports['parse variable starting with underscore'] = function (test) {
    const result = parsers.parse('term', '_X');
    
    test.ok(result);
    test.equal(result.ntype(), 'variable');
    test.equal(result.name(), '_X');
};

exports['parse anonymous variable'] = function (test) {
    const result = parsers.parse('term', '_');
    
    test.ok(result);
    test.equal(result.ntype(), 'variable');
    test.equal(result.name(), '_');
};

exports['parse quoted atom'] = function (test) {
    const result = parsers.parse('term', "'X'");
    
    test.ok(result);
    test.equal(result.ntype(), 'atom');
    test.equal(result.name(), 'X');
};

exports['parse add integers'] = function (test) {
    const result = parsers.parse('expression', "2 + 40");
    
    test.ok(result);
    test.equal(result.ntype(), 'binary');
    test.equal(result.operator(), '+');    
    test.equal(result.left().ntype(), 'constant');
    test.equal(result.left().value(), 2);
    test.equal(result.right().ntype(), 'constant');
    test.equal(result.right().value(), 40);
};

exports['parse subtract integers'] = function (test) {
    const result = parsers.parse('expression', "44 - 2");
    
    test.ok(result);
    test.equal(result.ntype(), 'binary');
    test.equal(result.operator(), '-');
    test.equal(result.left().ntype(), 'constant');
    test.equal(result.left().value(), 44);
    test.equal(result.right().ntype(), 'constant');
    test.equal(result.right().value(), 2);
};

exports['parse multiply integers'] = function (test) {
    const result = parsers.parse('expression', "21 * 2");
    
    test.ok(result);
    test.equal(result.ntype(), 'binary');
    test.equal(result.operator(), '*');
    test.equal(result.left().ntype(), 'constant');
    test.equal(result.left().value(), 21);
    test.equal(result.right().ntype(), 'constant');
    test.equal(result.right().value(), 2);
};

exports['parse divide integers'] = function (test) {
    const result = parsers.parse('expression', "84 / 2");
    
    test.ok(result);
    test.equal(result.ntype(), 'binary');
    test.equal(result.operator(), '/');
    test.equal(result.left().ntype(), 'constant');
    test.equal(result.left().value(), 84);
    test.equal(result.right().ntype(), 'constant');
    test.equal(result.right().value(), 2);
};

exports['parse multiply and add integers'] = function (test) {
    const result = parsers.parse('expression', "2 * 20 + 2");
    
    test.ok(result);
    test.equal(result.ntype(), 'binary');
    test.equal(result.operator(), '+');
    test.equal(result.left().ntype(), 'binary');
    test.equal(result.left().operator(), '*');
    test.equal(result.left().left().ntype(), 'constant');
    test.equal(result.left().left().value(), 2);
    test.equal(result.left().right().ntype(), 'constant');
    test.equal(result.left().right().value(), 20);
    test.equal(result.right().ntype(), 'constant');
    test.equal(result.right().value(), 2);
};

exports['parse add and multiply integers'] = function (test) {
    const result = parsers.parse('expression', "2 + 2 * 20");
    
    test.ok(result);
    test.equal(result.ntype(), 'binary');
    test.equal(result.operator(), '+');
    test.equal(result.left().ntype(), 'constant');
    test.equal(result.left().value(), 2);
    test.equal(result.right().ntype(), 'binary');
    test.equal(result.right().operator(), '*');
    test.equal(result.right().left().ntype(), 'constant');
    test.equal(result.right().left().value(), 2);
    test.equal(result.right().right().ntype(), 'constant');
    test.equal(result.right().right().value(), 20);
};

exports['parse simple expression in parentheses'] = function (test) {
    const result = parsers.parse('expression', "(84 / 2)");
    
    test.ok(result);
    test.equal(result.ntype(), 'binary');
    test.equal(result.operator(), '/');
    test.equal(result.left().ntype(), 'constant');
    test.equal(result.left().value(), 84);
    test.equal(result.right().ntype(), 'constant');
    test.equal(result.right().value(), 2);
};

exports['parse match expression'] = function (test) {
    const result = parsers.parse('expression', "X = 42");
    
    test.ok(result);
    test.equal(result.ntype(), 'match');
    test.equal(result.left().ntype(), 'variable');
    test.equal(result.left().name(), 'X');
    test.equal(result.right().ntype(), 'constant');
    test.equal(result.right().value(), 42);
};

exports['parse empty tuple expression'] = function (test) {
    const result = parsers.parse('expression', "{}");
    
    test.ok(result);
    test.equal(result.ntype(), 'tuple');
    test.deepEqual(result.expressions(), []);
};

exports['parse tuple expression'] = function (test) {
    const result = parsers.parse('expression', "{ foo, bar }");
    
    test.ok(result);
    test.equal(result.ntype(), 'tuple');
    test.equal(result.expressions().length, 2);
    test.equal(result.expressions()[0].ntype(), 'atom');
    test.equal(result.expressions()[0].name(), 'foo');
    test.equal(result.expressions()[1].ntype(), 'atom');
    test.equal(result.expressions()[1].name(), 'bar');
};

exports['parse empty list expression'] = function (test) {
    const result = parsers.parse('expression', "[]");
    
    test.ok(result);
    test.equal(result.ntype(), 'list');
    test.deepEqual(result.expressions(), []);
};

exports['parse list expression'] = function (test) {
    const result = parsers.parse('expression', "[ 1, 4, 9 ]");
    
    test.ok(result);
    test.equal(result.ntype(), 'list');
    test.equal(result.expressions().length, 3);
    test.equal(result.expressions()[0].ntype(), 'constant');
    test.equal(result.expressions()[0].value(), 1);
    test.equal(result.expressions()[1].ntype(), 'constant');
    test.equal(result.expressions()[1].value(), 4);
    test.equal(result.expressions()[2].ntype(), 'constant');
    test.equal(result.expressions()[2].value(), 9);
};


