
const modules = {};
var current;

function Module(name) {
    this.name = function () { return name; };
}

function createModule(name) {
    if (modules[name])
        return modules[name];
    
    const module = new Module(name);
    
    modules[name] = module;
    
    return module;
}

function currentModule(value) {
    if (value)
        current = value;
    else
        return current;
}

module.exports = {
    module: createModule,
    current: currentModule
};

