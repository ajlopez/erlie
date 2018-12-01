
var Symbol = require('./symbols').Symbol;

function Atom(name) {
    Symbol.call(this, name);
}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance

Atom.prototype = Object.create(Symbol.prototype);
Atom.prototype.constructor = Symbol;

Atom.prototype.evaluate = function (context) { return this; };

function createAtom(name) {
    return new Atom(name);
}

function isAtom(atom) {
    return atom instanceof Atom;
}

module.exports = {
    atom: createAtom,
    isAtom: isAtom
}

