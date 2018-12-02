
var modules = require('../lib/modules');

exports['module with name'] = function (test) {
    var module = modules.module('math');
    
    test.ok(module);
    test.equal(typeof module, 'object');
    
    test.equal(module.name(), 'math');
};

exports['module with name twice'] = function (test) {
    var module = modules.module('math');
    var moduleb = modules.module('math');
    
    test.strictEqual(module, moduleb);
};

exports['no current module'] = function (test) {
    test.equal(modules.current(), null);
};

