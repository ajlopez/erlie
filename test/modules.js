
var modules = require('../lib/modules');

exports['module with name'] = function (test) {
    var module = modules.module('math');
    
    test.ok(module);
    test.equal(typeof module, 'object');
    
    test.equal(module.name(), 'math');
};

