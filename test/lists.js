
var lists = require('../lib/lists');

exports['create list'] = function (test) {
    var list = lists.list(42);
    
    test.ok(list);
    test.equal(typeof list, 'object');
};

exports['get head'] = function (test) {
    var list = lists.list(42);
    
    test.equal(list.head(), 42);
};

