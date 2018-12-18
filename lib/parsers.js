
var lexers = require('./lexers');
var TokenType = lexers.TokenType;
var expressions = require('./expressions');

function Parser(text) {
    var lexer = lexers.lexer(text);
    
    this.parse = function () {
        var term = parseTerm();
        
        if (term == null)
            return null;
        
        var oper = tryParseOperator();
        
        if (!oper)
            return term;
        
        if (oper.value === '+')
            return expressions.add(term, this.parse());

        if (oper.value === '-')
            return expressions.subtract(term, this.parse());

        if (oper.value === '*')
            return expressions.multiply(term, this.parse());
    };
    
    function tryParseOperator() {
        var token = lexer.nextToken();
        
        if (token && token.type === TokenType.Operator)
            return token;
        
        if (token)
            lexer.pushToken(token);
    }
    
    function parseTerm() {
        var token = lexer.nextToken();
        
        if (token.type === TokenType.Number)
            return expressions.constant(parseInt(token.value));

        if (token.type === TokenType.Name) {
            if (isUpperCaseLetter(token.value[0]) || token.value[0] === '_')
                return expressions.variable(token.value);
            
            if (token.value[0] === "'")
                return expressions.atom(token.value.substring(1, token.value.length - 1));
            
            return expressions.atom(token.value);
        }
    }
    
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