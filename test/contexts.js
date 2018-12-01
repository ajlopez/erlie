
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

exports['bind and resolve variable'] = function (test) {
    var varx = variables.variable('X');
    var context = contexts.context();
    
    context.bind(varx, 42);
    
    test.equal(context.resolve(varx), 42);
};

