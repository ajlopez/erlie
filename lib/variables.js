
function Variable(name) {
    this.name = function () { return name; };
    this.toString = function () { return name; };
}

function createVariable(name) {
    return new Variable(name);
}

function isVariable(variable) {
    return variable instanceof Variable;
}

module.exports = {
    variable: createVariable,
    isVariable: isVariable
}

