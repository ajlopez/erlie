
const variables = require('./variables');
const atoms = require('./atoms');
const tuples = require('./tuples');
const lists = require('./lists');

function Context(parent, options)  {
    if (parent && !(parent instanceof Context) && !options) {
        options = parent;
        parent = null;
    }
    
    options = options || {};
    
    const vars = {};
    const funs = {};
    const self = this;
    
    this.parent = function () { return parent; };
    this.process = function () { return options.process; };
    
    this.fun = function (name, arity, fn) {
        if (!funs[name])
            if (!fn)
                return null;
            else
                funs[name] = [];
        
        if (fn)
            funs[name][arity] = fn;
        else
            return funs[name][arity];
    }
    
    this.resolve = function (variable) { 
        const name = variable.name();
        const value = vars[name];
        
        if (value) {
            if (variables.isVariable(value))
                return this.resolve(value);
            
            return vars[name];
        }
        
        if (parent)
            return parent.resolve(variable);
        
        return variable; 
    };
    
    this.bind = function (variable, value) {
        if (variable.equals(value))
            return;
        
        const name = variable.name();
        
        if (vars[name])
            throw new Error('already bound variable');
        
        vars[name] = value; 
    }; 
    
    this.match = function (lvalue, rvalue) {
        const processed = [];
        const result = match(lvalue, rvalue, processed);
        
        if (result)
            return true;
        
        for (var k = 0; k < processed.length; k++)
            delete vars[processed[k].name()];

        return false;
    };

    function match(lvalue, rvalue, processed) {
        if (Array.isArray(lvalue)) {
            if (!Array.isArray(rvalue))
                return false;
            
            if (lvalue.length !== rvalue.length)
                return false;
            
            const l = lvalue.length;
            
            for (var k = 0; k < l; k++)
                if (!matchElements(lvalue[k], rvalue[k], processed))
                    return false;
                
            return true;
        }
        
        if (variables.isVariable(lvalue)) {
            self.bind(lvalue, rvalue);
            return true;
        }

        if (atoms.isAtom(lvalue))
            return lvalue.equals(rvalue);
        
        if (lists.isList(lvalue)) {
            if (!lists.isList(rvalue))
                return false;
            
            if (!matchElements(lvalue.head(), rvalue.head(), processed))
                return false;
                
            if (!matchElements(lvalue.tail(), rvalue.tail(), processed))
                return false;
            
            return true;
        }

        if (tuples.isTuple(lvalue)) {
            if (!tuples.isTuple(rvalue))
                return false;
            
            const n = lvalue.size();
            
            if (n !== rvalue.size())
                return false;
            
            for (var k = 0; k < n; k++)
                if (!matchElements(lvalue.element(k), rvalue.element(k), processed))
                    return false;
                
            return true;
        }

        return lvalue === rvalue;
    };
    
    function matchElements(lelem, relem, processed) {
        if (variables.isVariable(lelem))
            lelem = self.resolve(lelem);
        
        if (variables.isVariable(relem))
            relem = self.resolve(relem);
        
        if (!match(lelem, relem, processed))
            return false;
        
        if (variables.isVariable(lelem))
            processed.push(lelem);
        
        return true;
    }
    
    this.evaluate = function (value) {
        if (value && value.evaluate)
            return value.evaluate(this);
        
        if (Array.isArray(value)) {
            const result = [];
            
            for (var n in value)
                result[n] = this.evaluate(value[n]);
            
            return result;
        }
        
        return value;
    };
}

function createContext(parent, options) {
    return new Context(parent, options);
}

module.exports = {
    context: createContext
};

