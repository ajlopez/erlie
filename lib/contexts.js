
var variables = require('./variables');
var tuples = require('./tuples');

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
        
        if (tuples.isTuple(lvalue)) {
            if (!tuples.isTuple(rvalue))
                return false;
            
            var n = lvalue.size();
            
            if (n !== rvalue.size())
                return false;
            
            for (var k = 0; k < n; k++) {
                var lelem = lvalue.element(k);
                
                if (variables.isVariable(lelem))
                    lelem = this.resolve(lelem);
                
                if (!this.match(lelem, rvalue.element(k)))
                    return false;
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