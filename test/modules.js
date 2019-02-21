
const modules = require('../lib/modules');

exports['module with name'] = function (test) {
    const module = modules.module('math');
    
    test.ok(module);
    test.equal(typeof module, 'object');
    
    test.equal(module.name(), 'math');
};

exports['module with name twice'] = function (test) {
    const module = modules.module('math');
    const moduleb = modules.module('math');
    
    test.strictEqual(module, moduleb);
};

exports['no current module'] = function (test) {
    test.equal(modules.current(), null);
};

exports['current module'] = function (test) {
    const module = modules.module('math');
    
    modules.current(module);
    test.strictEqual(modules.current(), modules.module('math'));
};

