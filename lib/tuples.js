
function Tuple(elements) {
    this.size = function () { return elements.length; };
    this.element = function (n) { return elements[n]; };
    
    this.evaluate = function (context) {
        var values = [];
        
        elements.forEach(function (element) {
            values.push(context.evaluate(element));
        });
        
        return new Tuple(values);
    };
}

function createTuple(elements) {
    return new Tuple(elements);
}

function isTuple(value) {
    return value instanceof Tuple;
}

module.exports = {
    tuple: createTuple,
    isTuple: isTuple
};