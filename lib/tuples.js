
function Tuple(elements) {
    this.size = function () { return elements.length; };
    
    this.element = function (n) { return elements[n]; };
    
    this.evaluate = function (context) {
        const values = [];
        
        elements.forEach(function (element) {
            values.push(context.evaluate(element));
        });
        
        return new Tuple(values);
    };
    
    this.equals = function (value) {
        if (!isTuple(value))
            return false;
        
        if (elements.length != value.size())
            return false;
        
        for (var k = 0; k < elements.length; k++)
            if (elements[k].equals) {
                if (!elements[k].equals(value.element(k)))
                    return false;
            }
            else if (elements[k] !== value.element(k))
                return false;
            
        return true;
    }
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
