
function Context()  {
    var vars = {};
    
    this.resolve = function (variable) { 
        var name = variable.name();
        
        if (vars[name])
            return vars[name];
        
        return variable; 
    };
    
    this.bind = function (variable, value) { vars[variable.name()] = value; }; 
}

function createContext() {
    return new Context();
}

module.exports = {
    context: createContext
};