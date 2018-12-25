
function List(head) {
    this.head = function () { return head; }
}
    
function createList(head) {
    return new List(head);
}

function isList(value) {
    return value instanceof List;
}

module.exports = {
    list: createList,
    isList: isList
};

