
function List(head) {
    this.head = function () { return head; }
}
    
function createList(head) {
    return new List(head);
}

module.exports = {
    list: createList
};