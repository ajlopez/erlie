
const parsers = require('../lib/parsers');
const contexts = require('../lib/contexts');
const atoms = require('../lib/atoms');
const variables = require('../lib/variables');
const tuples = require('../lib/tuples');
const lists = require('../lib/lists');

exports['create parser as object'] = function (test) {
    const parser = parsers.parser('foo');
    
    test.ok(parser);
    test.equal(typeof parser, 'object');
};

exports['parse integer constant'] = function (test) {
    const parser = parsers.parser('42');
    
    const result = parser.parse();
    
    test.ok(result);
    test.equal(result.evaluate(), 42);
};

exports['parse string constant'] = function (test) {
    const parser = parsers.parser('"foo"');
    
    const result = parser.parse();
    
    test.ok(result);
    test.equal(result.evaluate(), "foo");
};

exports['parse atom'] = function (test) {
    const parser = parsers.parser('foo');
    
    const result = parser.parse();
    
    test.ok(result);
    test.strictEqual(result.evaluate(), result);
    test.ok(atoms.isAtom(result));
};

exports['parse variable starting with uppercase letter'] = function (test) {
    const parser = parsers.parser('X');
    const context = contexts.context();
    const varx = variables.variable('X');
    
    context.bind(varx, 42);
    
    var result = parser.parse();
    
    test.ok(result);
    test.strictEqual(result.evaluate(context), 42);
    test.ok(variables.isVariable(result));
    test.ok(result.equals(varx));
};

exports['parse variable starting with underscore'] = function (test) {
    const parser = parsers.parser('_X');
    const context = contexts.context();
    const varx = variables.variable('_X');
    
    context.bind(varx, 42);
    
    const result = parser.parse();
    
    test.ok(result);
    test.strictEqual(result.evaluate(context), 42);
    test.ok(variables.isVariable(result));
    test.ok(result.equals(varx));
};

exports['parse anonymous variable'] = function (test) {
    const parser = parsers.parser('_');
    const context = contexts.context();
    const avar = variables.variable('_');
    
    const result = parser.parse();
    
    test.ok(result);
    test.ok(result.evaluate(context).equals(avar));
    test.ok(variables.isVariable(result));
    test.ok(result.equals(avar));
};

exports['parse quoted atom'] = function (test) {
    const parser = parsers.parser("'X'");
    const context = contexts.context();
    const xatom = atoms.atom('X');
    
    const result = parser.parse();
    
    test.ok(result);
    test.ok(result.evaluate(context).equals(xatom));
    test.ok(atoms.isAtom(result));
    test.ok(result.equals(xatom));
};

exports['parse add integers'] = function (test) {
    const parser = parsers.parser("2 + 40");
    const context = contexts.context();
    
    const result = parser.parse();
    
    test.ok(result);
    test.equal(result.evaluate(context), 42);
};

exports['parse subtract integers'] = function (test) {
    const parser = parsers.parser("44 - 2");
    const context = contexts.context();
    
    const result = parser.parse();
    
    test.ok(result);
    test.equal(result.evaluate(context), 42);
};

exports['parse multiply integers'] = function (test) {
    const parser = parsers.parser("21 * 2");
    const context = contexts.context();
    
    const result = parser.parse();
    
    test.ok(result);
    test.equal(result.evaluate(context), 42);
};

exports['parse divide integers'] = function (test) {
    const parser = parsers.parser("84 / 2");
    const context = contexts.context();
    
    const result = parser.parse();
    
    test.ok(result);
    test.equal(result.evaluate(context), 42);
};

exports['parse add and multiply integers'] = function (test) {
    const parser = parsers.parser("2 * 20 + 2");
    const context = contexts.context();
    
    const result = parser.parse();
    
    test.ok(result);
    test.equal(result.evaluate(context), 42);
};

exports['parse simple expression in parentheses'] = function (test) {
    const parser = parsers.parser("(84 / 2)");
    const context = contexts.context();
    
    const result = parser.parse();
    
    test.ok(result);
    test.equal(result.evaluate(context), 42);
};

exports['parse match expression'] = function (test) {
    const parser = parsers.parser("X = 42");
    const context = contexts.context();
    const varx = variables.variable('X');
    
    const result = parser.parse();
    
    test.ok(result);
    test.equal(result.evaluate(context), true);
    test.equal(context.resolve(varx), 42);
};

exports['parse empty tuple expression'] = function (test) {
    const parser = parsers.parser("{}");
    const context = contexts.context();
    
    const result = parser.parse();
    
    test.ok(result);
    test.ok(tuples.isTuple(result.evaluate(context)));
};

exports['parse tuple expression'] = function (test) {
    const parser = parsers.parser("{ foo, bar }");
    const context = contexts.context();
    
    const result = parser.parse();
    
    test.ok(result);
    
    const tuple = result.evaluate(context);
    
    test.ok(tuple);
    test.ok(tuples.isTuple(tuple));
    test.equal(tuple.size(), 2);
    
    test.ok(atoms.isAtom(tuple.element(0)));
    test.ok(atoms.isAtom(tuple.element(1)));
    
    test.equal(tuple.element(0).name(), 'foo');
    test.equal(tuple.element(1).name(), 'bar');
};

exports['parse empty list expression'] = function (test) {
    const parser = parsers.parser("[]");
    const context = contexts.context();
    
    const result = parser.parse();
    
    test.ok(result);

    const list = result.evaluate(context);
    
    test.ok(list);
    test.ok(lists.isList(list));
    test.ok(list.isEmpty());
};

exports['parse list expression'] = function (test) {
    const parser = parsers.parser("[1, 4, 9]");
    const context = contexts.context();
    
    const result = parser.parse();
    
    test.ok(result);

    const list = result.evaluate(context);
    
    test.ok(list);
    test.ok(lists.isList(list));
    test.ok(!list.isEmpty());
    test.ok(list.equals(lists.fromValues([1, 4, 9])));
};

