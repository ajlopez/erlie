
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

