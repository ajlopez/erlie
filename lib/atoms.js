
function Atom(name) {
    this.name = function () { return name; };
    this.toString = function () { return name; };
}

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

