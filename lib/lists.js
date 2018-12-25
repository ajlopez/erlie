
function List(head, tail) {
    if (tail === undefined)
        tail = null;
    
    this.head = function () { return head; }
    
    this.tail = function () { return tail; }
    
    this.equals = function (value) {
        if (!isList(value))
            return false;
        
        if (head !== value.head())
            return false;
        
        return tail === value.tail();
    }
}
    
function createList(head, tail) {
    return new List(head, tail);
}

function isList(value) {
    return value instanceof List;
}

module.exports = {
    list: createList,
    isList: isList
};

