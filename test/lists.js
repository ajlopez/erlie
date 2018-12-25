
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

exports['get empty tail'] = function (test) {
    var list = lists.list(42);
    
    test.strictEqual(list.tail(), null);
};

exports['equals'] = function (test) {
    var list1 = lists.list(42);
    var list2 = lists.list(42);
    var list3 = lists.list(1, lists.list(2));
    var list4 = lists.list(1, lists.list(2));
    var list5 = lists.list(lists.list(42));
    var list6 = lists.list(lists.list(42));
    
    test.ok(list1.equals(list1));
    test.ok(list1.equals(list2));
    test.ok(list2.equals(list1));
    test.ok(list3.equals(list3));
    test.ok(list3.equals(list4));
    test.ok(list4.equals(list3));
    test.ok(list5.equals(list5));
    test.ok(list5.equals(list6));
    test.ok(list6.equals(list5));

    test.ok(!list1.equals(42));
    test.ok(!list1.equals("foo"));
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

