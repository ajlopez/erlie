
function Tuple(elements) {
    this.size = function () { return elements.length; };
    this.element = function (n) { return elements[n]; };
}

function createTuple(elements) {
    return new Tuple(elements);
}

module.exports = {
    tuple: createTuple
};