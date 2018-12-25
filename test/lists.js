
var lists = require('../lib/lists');
var tuples = require('../lib/tuples');
var atoms = require('../lib/atoms');
var variables = require('../lib/variables');

exports['create list'] = function (test) {
    var list = lists.list(42);
    
    test.ok(list);
    test.equal(typeof list, 'object');
};

exports['get head'] = function (test) {
    var list = lists.list(42);
    
    test.equal(list.head(), 42);
};

exports['is list'] = function (test) {
    var list1 = lists.list(42);
    var list2 = lists.list(1, lists.list(2));
    
    test.ok(lists.isList(list1));
    test.ok(lists.isList(list2));
   
    test.ok(!lists.isList(null));
    test.ok(!lists.isList(42));
    test.ok(!lists.isList("foo"));
    test.ok(!lists.isList(atoms.atom('adam')));
    test.ok(!lists.isList(variables.variable('X')));
    test.ok(!lists.isList(tuples.tuple([1, 2, 3])));
};

