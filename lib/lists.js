
function EmptyList() {
    this.isEmpty = function () { return true; }
}

const emptyList = new EmptyList();

function List(head, tail) {
    if (tail === undefined)
        tail = null;
    
    this.head = function () { return head; }
    
    this.tail = function () { return tail; }
    
    this.equals = function (value) {
        if (this === value)
            return true;
        
        if (!isList(value))
            return false;
        
        if (head && head.equals) {
            if (!head.equals(value.head()))
                return false;
        }
        else if (head !== value.head())
            return false;
        
        if (tail && tail.equals)
            return tail.equals(value.tail());
        
        return tail === value.tail();
    }
}
    
function createList(head, tail) {
    return new List(head, tail);
}

function isList(value) {
    return value instanceof List || value === emptyList;
}

module.exports = {
    list: createList,
    isList: isList,
    empty: function () { return emptyList; }
};

