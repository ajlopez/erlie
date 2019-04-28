
const contexts = require('./contexts');

function Interpreter(context) {
    context = context || contexts.context();
    
    this.process = function (node) {
        return node.process(this);
    };
    
    this.processConstant = function (node) {
        return node.value();
    };

    this.processAtom = function (node) {
        return node.value();
    };
    
    this.processVariable = function (node) {
        return context.resolve(node.value());
    };
    
    this.processMatch = function (node) {
        return context.match(this.process(node.left()), this.process(node.right()));
    };
}

module.exports = {
    process: function (node, context) { return (new Interpreter(context)).process(node); }
};


