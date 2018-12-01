
function Module(name) {
    this.name = function () { return name; };
}

function createModule(name) {
    return new Module(name);
}

module.exports = {
    module: createModule
};