
function Context()  {
    this.resolve = function (variable) { return variable; };
}

function createContext() {
    return new Context();
}

module.exports = {
    context: createContext
};