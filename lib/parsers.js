
var lexers = require('./lexers');
var TokenType = lexers.TokenType;
var expressions = require('./expressions');

function Parser(text) {
    var lexer = lexers.lexer(text);
    
    this.parse = function () {
        var token = lexer.nextToken();
        
        if (token.type === TokenType.Number)
            return expressions.constant(parseInt(token.value));

        if (token.type === TokenType.Name) {
            if (isUpperCaseLetter(token.value[0]))
                return expressions.variable(token.value);
            
            return expressions.atom(token.value);
        }
    };
    
    function isUpperCaseLetter(ch) {
        return ch >= 'A' && ch <= 'Z';
    }
};

function createParser(text) {
    return new Parser(text);
}

module.exports = {
    parser: createParser
};