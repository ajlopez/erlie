
var processes = require('../lib/processes');

exports['create process'] = function (test) {
    var process = processes.process();
    
    test.ok(process);
    test.equal(typeof process, 'object');
};

