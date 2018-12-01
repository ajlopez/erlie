
var processes = require('../lib/processes');

exports['create process'] = function (test) {
    var process = processes.process();
    
    test.ok(process);
    test.equal(typeof process, 'object');
};

exports['send and receive message'] = function (test) {
    test.async();
    
    var process = processes.process();
    
    process.send(42);
    
    process.receive(function (message) {
        test.equal(message, 42);
        test.done();
    });
};

exports['send and receive two messages'] = function (test) {
    test.async();
    
    var process = processes.process();
    
    process.send(42);
    process.send(144);
    
    process.receive(function (message) {
        test.equal(message, 42);
        test.equal(process.size(), 0);
    });

    process.receive(function (message) {
        test.equal(message, 144);
        test.equal(process.size(), 0);
        test.done();
    });
};

exports['receive and send message'] = function (test) {
    test.async();
    
    var process = processes.process();
    
    process.receive(function (message) {
        test.equal(message, 42);
        test.done();
    });
    
    process.send(42);
};

