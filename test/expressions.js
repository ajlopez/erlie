
var x = require('../lib/expressions');
var contexts = require('../lib/contexts');
var atoms = require('../lib/atoms');
var variables = require('../lib/variables');

exports['atom expression'] = function (test) {
    var expr = x.atom('a');
    
    test.ok(expr);
    
    var result = expr.evaluate(null);
    
    test.ok(result);
    test.ok(atoms.isAtom(result));
    test.ok(result.equals(atoms.atom('a')));
};

exports['variable expression'] = function (test) {
    var expr = x.variable('X');
    var context = contexts.context();
  
    test.ok(expr);
    
    var result = expr.evaluate(context);
    
    test.ok(result);
    test.ok(variables.isVariable(result));
    test.ok(result.equals(variables.variable('X')));
};

exports['match expression'] = function (test) {
    var lexpr = x.variable('X');
    var rexpr = x.constant(42);
    
    var context = contexts.context();
    
    var expr = x.match(lexpr, rexpr);
    
    test.strictEqual(expr.evaluate(context), true);
    
    test.equal(context.resolve(variables.variable('X')), 42);
};

exports['add expression using constants'] = function (test) {
    var context = contexts.context();
    
    var expr = x.add(x.constant(40), x.constant(2));
    
    test.strictEqual(expr.evaluate(context), 42);
};

exports['add expression using variables'] = function (test) {
    var context = contexts.context();
    
    var varx = x.variable('X');
    var vary = x.variable('Y');
    
    context.bind(varx, 40);
    context.bind(vary, 2);
    
    var expr = x.add(varx, vary);
    
    test.strictEqual(expr.evaluate(context), 42);
};

