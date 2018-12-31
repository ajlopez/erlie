
var lexers = require('./lexers');
var TokenType = lexers.TokenType;
var expressions = require('./expressions');

function Parser(text) {
    var self = this;
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

        if (oper.value === '/')
            return expressions.divide(term, this.parse());

        if (oper.value === '=')
            return expressions.match(term, this.parse());
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
        
        if (token == null)
            return null;
        
        if (token.type === TokenType.Number)
            return expressions.constant(parseInt(token.value));

        if (token.type === TokenType.String)
            return expressions.constant(token.value);

        if (token.type === TokenType.Name) {
            if (isUpperCaseLetter(token.value[0]) || token.value[0] === '_')
                return expressions.variable(token.value);
            
            if (token.value[0] === "'")
                return expressions.atom(token.value.substring(1, token.value.length - 1));
            
            return expressions.atom(token.value);
        }
        
        if (token.type === TokenType.Delimiter && token.value === '(') {
            var expr = self.parse();
            
            parseToken(TokenType.Delimiter, ')');
            
            return expr;
        }

        if (token.type === TokenType.Delimiter && token.value === '{') {
            var exprs = [];
            
            while (!tryParseToken(TokenType.Delimiter, '}')) {
                if (exprs.length)
                    parseToken(TokenType.Delimiter, ',');
                
                exprs.push(self.parse());
            }
            
            return expressions.tuple(exprs);
        }
    }
    
    function isUpperCaseLetter(ch) {
        return ch >= 'A' && ch <= 'Z';
    }
    
    function parseToken(type, value) {
        var token = lexer.nextToken();
        
        if (!token || token.type !== type || token.value !== value)
            throw new Error("Expected '" + value + "'");
    }

    function tryParseToken(type, value) {
        var token = lexer.nextToken();
        
        if (token && token.type === type && token.value === value)
            return true;
        
        if (token)
            lexer.pushToken(token);
        
        return false;
    }
};

function createParser(text) {
    return new Parser(text);
}

module.exports = {
    parser: createParser
};