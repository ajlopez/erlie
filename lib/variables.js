
const Symbol = require('./symbols').Symbol;

function Variable(name) {
    Symbol.call(this, name);
    
    this.equals = function (value) {
        return isVariable(value) && name === value.name();
    };
}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance

Variable.prototype = Object.create(Symbol.prototype);
Variable.prototype.constructor = Symbol;

Variable.prototype.evaluate = function (context) { return context.resolve(this); };

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

