
var tuples = require('../lib/tuples');
var contexts = require('../lib/contexts');

exports['create empty tuple'] = function (test) {
    var tuple = tuples.tuple([]);
    
    test.ok(tuple);
    test.equal(typeof tuple, 'object');
    test.equal(tuple.size(), 0);
};

exports['create tuple with three elements'] = function (test) {
    var tuple = tuples.tuple([1, 4, 9]);
    
    test.ok(tuple);
    test.equal(typeof tuple, 'object');
    test.equal(tuple.size(), 3);
    test.equal(tuple.element(0), 1);
    test.equal(tuple.element(1), 4);
    test.equal(tuple.element(2), 9);
};

exports['evaluate tuple with three constants elements'] = function (test) {
    var context = contexts.context();
    var tuple = tuples.tuple([1, 4, 9]);
    
    test.ok(tuple);
    test.equal(typeof tuple, 'object');
    test.equal(tuple.size(), 3);
    test.equal(tuple.element(0), 1);
    test.equal(tuple.element(1), 4);
    test.equal(tuple.element(2), 9);
};

