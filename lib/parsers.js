
var lexers = require('./lexers');
var expressions = require('./expressions');

function Parser(text) {
    var lexer = lexers.lexer(text);
    
    this.parse = function () {
        return expressions.constant(lexer.nextToken().value);
    };
};

function createParser(text) {
    return new Parser(text);
}

module.exports = {
    parser: createParser
};