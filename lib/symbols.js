
function Symbol(name) {
    this.name = function () { return name; };
    this.toString = function () { return name; };
}

module.exports = {
    Symbol: Symbol
}

