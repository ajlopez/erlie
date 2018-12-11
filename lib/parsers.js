
function Parser(text) {
    
};

function createParser(text) {
    return new Parser(text);
}

module.exports = {
    parser: createParser
};