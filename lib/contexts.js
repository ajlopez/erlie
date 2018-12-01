
var variables = require('./variables');

function Context()  {
    var vars = {};
    
    this.resolve = function (variable) { 
        var name = variable.name();
        
        if (vars[name])
            return vars[name];
        
        return variable; 
    };
    
    this.bind = function (variable, value) { 
        var name = variable.name();
        
        if (vars[name])
            throw new Error('already bound variable');
        
        vars[name] = value; 
    }; 
    
    this.match = function (lvalue, rvalue) {
        if (variables.isVariable(lvalue)) {
            this.bind(lvalue, rvalue);
            return true;
        }

        return lvalue === rvalue;
    }
}

function createContext() {
    return new Context();
}

module.exports = {
    context: createContext
};