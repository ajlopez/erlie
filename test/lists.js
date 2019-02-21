
const lists = require('../lib/lists');
const tuples = require('../lib/tuples');
const atoms = require('../lib/atoms');
const variables = require('../lib/variables');

exports['create list'] = function (test) {
    const list = lists.list(42);
    
    test.ok(list);
    test.equal(typeof list, 'object');
};

exports['create list from values'] = function (test) {
    const list = lists.fromValues([1, 4, 9]);
    
    test.ok(list);
    test.ok(lists.list(1, lists.list(4, lists.list(9))).equals(list));
};

exports['create empty list from values'] = function (test) {
    const list = lists.fromValues([]);
    
    test.ok(list);
    test.ok(lists.isList(list));
    test.ok(list.isEmpty());
};

exports['get head'] = function (test) {
    const list = lists.list(42);
    
    test.equal(list.head(), 42);
};

exports['get empty tail'] = function (test) {
    const list = lists.list(42);
    
    test.strictEqual(list.tail(), null);
};

exports['is not empty list'] = function (test) {
    const list = lists.list(42);
    
    test.ok(!list.isEmpty());
};

exports['equals'] = function (test) {
    const list1 = lists.list(42);
    const list2 = lists.list(42);
    const list3 = lists.list(1, lists.list(2));
    const list4 = lists.list(1, lists.list(2));
    const list5 = lists.list(lists.list(42));
    const list6 = lists.list(lists.list(42));
    
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
    const list1 = lists.list(42);
    const list2 = lists.list(1, lists.list(2));
    
    test.ok(lists.isList(list1));
    test.ok(lists.isList(list2));
   
    test.ok(!lists.isList(null));
    test.ok(!lists.isList(42));
    test.ok(!lists.isList("foo"));
    test.ok(!lists.isList(atoms.atom('adam')));
    test.ok(!lists.isList(variables.variable('X')));
    test.ok(!lists.isList(tuples.tuple([1, 2, 3])));
};

exports['empty list'] = function (test) {
    const result = lists.empty();
    
    test.ok(result);
    test.ok(lists.isList(result));
    test.ok(result.isEmpty());
};

