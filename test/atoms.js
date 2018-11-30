
var atoms = require('../lib/atoms');

exports['create atom'] = function (test) {
    var atom = atoms.atom('foo');
    
    test.ok(atom);
    test.strictEqual(typeof atom, 'object');
};

exports['atom to string'] = function (test) {
    var atom = atoms.atom('foo');
    
    test.strictEqual(atom.toString(), 'foo');
};

exports['atom name'] = function (test) {
    var atom = atoms.atom('foo');
    
    test.strictEqual(atom.name(), 'foo');
};

exports['is atom'] = function (test) {
    var atom = atoms.atom('foo');

    test.ok(atoms.isAtom(atom));
    test.ok(!atoms.isAtom(null));
    test.ok(!atoms.isAtom(42));
    test.ok(!atoms.isAtom("foo"));
    test.ok(!atoms.isAtom({}));
};

