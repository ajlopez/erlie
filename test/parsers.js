
var parsers = require('../lib/parsers');
var contexts = require('../lib/contexts');
var atoms = require('../lib/atoms');
var variables = require('../lib/variables');
var tuples = require('../lib/tuples');
var lists = require('../lib/lists');

exports['create parser as object'] = function (test) {
    var parser = parsers.parser('foo');
    
    test.ok(parser);
    test.equal(typeof parser, 'object');
};

exports['parse integer constant'] = function (test) {
    var parser = parsers.parser('42');
    
    var result = parser.parse();
    
    test.ok(result);
    test.equal(result.evaluate(), 42);
};

exports['parse string constant'] = function (test) {
    var parser = parsers.parser('"foo"');
    
    var result = parser.parse();
    
    test.ok(result);
    test.equal(result.evaluate(), "foo");
};

exports['parse atom'] = function (test) {
    var parser = parsers.parser('foo');
    
    var result = parser.parse();
    
    test.ok(result);
    test.strictEqual(result.evaluate(), result);
    test.ok(atoms.isAtom(result));
};

exports['parse variable starting with uppercase letter'] = function (test) {
    var parser = parsers.parser('X');
    var context = contexts.context();
    var varx = variables.variable('X');
    
    context.bind(varx, 42);
    
    var result = parser.parse();
    
    test.ok(result);
    test.strictEqual(result.evaluate(context), 42);
    test.ok(variables.isVariable(result));
    test.ok(result.equals(varx));
};

exports['parse variable starting with underscore'] = function (test) {
    var parser = parsers.parser('_X');
    var context = contexts.context();
    var varx = variables.variable('_X');
    
    context.bind(varx, 42);
    
    var result = parser.parse();
    
    test.ok(result);
    test.strictEqual(result.evaluate(context), 42);
    test.ok(variables.isVariable(result));
    test.ok(result.equals(varx));
};

exports['parse anonymous variable'] = function (test) {
    var parser = parsers.parser('_');
    var context = contexts.context();
    var avar = variables.variable('_');
    
    var result = parser.parse();
    
    test.ok(result);
    test.ok(result.evaluate(context).equals(avar));
    test.ok(variables.isVariable(result));
    test.ok(result.equals(avar));
};

exports['parse quoted atom'] = function (test) {
    var parser = parsers.parser("'X'");
    var context = contexts.context();
    var xatom = atoms.atom('X');
    
    var result = parser.parse();
    
    test.ok(result);
    test.ok(result.evaluate(context).equals(xatom));
    test.ok(atoms.isAtom(result));
    test.ok(result.equals(xatom));
};

exports['parse add integers'] = function (test) {
    var parser = parsers.parser("2 + 40");
    var context = contexts.context();
    
    var result = parser.parse();
    
    test.ok(result);
    test.equal(result.evaluate(context), 42);
};

exports['parse subtract integers'] = function (test) {
    var parser = parsers.parser("44 - 2");
    var context = contexts.context();
    
    var result = parser.parse();
    
    test.ok(result);
    test.equal(result.evaluate(context), 42);
};

exports['parse multiply integers'] = function (test) {
    var parser = parsers.parser("21 * 2");
    var context = contexts.context();
    
    var result = parser.parse();
    
    test.ok(result);
    test.equal(result.evaluate(context), 42);
};

exports['parse divide integers'] = function (test) {
    var parser = parsers.parser("84 / 2");
    var context = contexts.context();
    
    var result = parser.parse();
    
    test.ok(result);
    test.equal(result.evaluate(context), 42);
};

exports['parse simple expression in parentheses'] = function (test) {
    var parser = parsers.parser("(84 / 2)");
    var context = contexts.context();
    
    var result = parser.parse();
    
    test.ok(result);
    test.equal(result.evaluate(context), 42);
};

exports['parse match expression'] = function (test) {
    var parser = parsers.parser("X = 42");
    var context = contexts.context();
    var varx = variables.variable('X');
    
    var result = parser.parse();
    
    test.ok(result);
    test.equal(result.evaluate(context), true);
    test.equal(context.resolve(varx), 42);
};

exports['parse empty tuple expression'] = function (test) {
    var parser = parsers.parser("{}");
    var context = contexts.context();
    
    var result = parser.parse();
    
    test.ok(result);
    test.ok(tuples.isTuple(result.evaluate(context)));
};

exports['parse empty tuple expression'] = function (test) {
    var parser = parsers.parser("{}");
    var context = contexts.context();
    
    var result = parser.parse();
    
    test.ok(result);
    
    var tuple = result.evaluate(context);
    
    test.ok(tuple);
    test.ok(tuples.isTuple(tuple));
    test.equal(tuple.size(), 0);
};

exports['parse list expression'] = function (test) {
    var parser = parsers.parser("[]");
    var context = contexts.context();
    
    var result = parser.parse();
    
    test.ok(result);

    var list = result.evaluate(context);
    
    test.ok(list);
    test.ok(lists.isList(list));
    test.ok(list.isEmpty());
};

