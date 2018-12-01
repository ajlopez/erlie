
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

