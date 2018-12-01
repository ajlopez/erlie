
var variables = require('./variables');
var tuples = require('./tuples');

function Context()  {
    var vars = {};
    var self = this;
    
    this.resolve = function (variable) { 
        var name = variable.name();
        var value = vars[name];
        
        if (value) {
            if (variables.isVariable(value))
                return this.resolve(value);
            
            return vars[name];
        }
        
        return variable; 
    };
    
    this.bind = function (variable, value) {
        if (variable.equals(value))
            return;
        
        var name = variable.name();
        
        if (vars[name])
            throw new Error('already bound variable');
        
        vars[name] = value; 
    }; 
    
    this.match = function (lvalue, rvalue) {
        var processed = [];
        var result = match(lvalue, rvalue, processed);
        
        if (result)
            return true;
        
        for (var k = 0; k < processed.length; k++)
            delete vars[processed[k].name()];

        return false;
    };

    function match(lvalue, rvalue, processed) {
        if (variables.isVariable(lvalue)) {
            self.bind(lvalue, rvalue);
            return true;
        }
        
        if (tuples.isTuple(lvalue)) {
            if (!tuples.isTuple(rvalue))
                return false;
            
            var n = lvalue.size();
            
            if (n !== rvalue.size())
                return false;
            
            for (var k = 0; k < n; k++) {
                var lelem = lvalue.element(k);
                var relem = rvalue.element(k);
                
                if (variables.isVariable(lelem))
                    lelem = self.resolve(lelem);
                
                if (variables.isVariable(relem))
                    relem = self.resolve(relem);
                
                if (!match(lelem, relem, processed))
                    return false;
                
                if (variables.isVariable(lelem))
                    processed.push(lelem);
            }
                
            return true;
        }

        return lvalue === rvalue;
    };
    
    this.evaluate = function (value) {
        if (value && value.evaluate)
            return value.evaluate(this);
        
        return value;
    };
}

function createContext() {
    return new Context();
}

module.exports = {
    context: createContext
};