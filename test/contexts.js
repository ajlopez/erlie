
var contexts = require('../lib/contexts');
var variables = require('../lib/variables');

exports['create context'] = function (test) {
    var context = contexts.context();
    
    test.ok(context);
    test.equal(typeof context, 'object');
};

exports['resolve unbound variable'] = function (test) {
    var varx = variables.variable('X');
    var context = contexts.context();
    
    test.equal(context.resolve(varx), varx);
};

exports['bind and resolve variable using integer value'] = function (test) {
    var varx = variables.variable('X');
    var context = contexts.context();
    
    context.bind(varx, 42);
    
    test.equal(context.resolve(varx), 42);
};

exports['cannot bind a variable twice'] = function (test) {
    var varx = variables.variable('X');
    var context = contexts.context();
    
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
    var varx = variables.variable('X');
    var vary = variables.variable('Y');
    
    var context = contexts.context();
    
    context.bind(varx, vary);
    
    test.equal(context.resolve(varx), vary);
};

exports['match simple values'] = function (test) {
    var context = contexts.context();
    
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

exports['match unbound variable'] = function (test) {
    var context = contexts.context();
    var varx = variables.variable('X');
    
    test.equal(context.resolve(varx), varx);
    
    test.ok(context.match(varx, 42));
    
    test.equal(context.resolve(varx), 42);
};

exports['match unbound variable to integer value'] = function (test) {
    var context = contexts.context();
    var varx = variables.variable('X');
    
    test.equal(context.resolve(varx), varx);
    
    test.ok(context.match(varx, 42));
    
    test.equal(context.resolve(varx), 42);
};

exports['match unbound variable to another variable'] = function (test) {
    var context = contexts.context();
    var varx = variables.variable('X');
    var vary = variables.variable('Y');
    
    test.equal(context.resolve(varx), varx);
    
    test.ok(context.match(varx, vary));
    
    test.equal(context.resolve(varx), vary);
};
