
const lexers = require('./lexers');
const TokenType = lexers.TokenType;
const expressions = require('./expressions');

const binaryOperators = [
    [ '=' ],
    [ '+', '-' ],
    [ '*', '/' ]
];

const operatorFactories = {
    '+': expressions.add,
    '-': expressions.subtract,
    '*': expressions.multiply,
    '/': expressions.divide,
    '=': expressions.match
};

function Parser(text) {
    const self = this;
    const lexer = lexers.lexer(text);
    
    this.parse = function () {
        return parseBinaryExpression(0);
    };

    function parseBinaryExpression(level) {
        if (!binaryOperators[level])
            return parseTerm();
        
        const expr = parseBinaryExpression(level + 1);
        
        if (expr == null)
            return null;
        
        var oper;
        
        if (!(oper = tryParseBinaryOperator(level)))
            return expr;

        var expr2 = parseBinaryExpression(level + 1);
        
        return operatorFactories[oper](expr, expr2);
    }
    
    function tryParseBinaryOperator(level) {
        const token = lexer.nextToken();
        
        if (token && token.type === TokenType.Operator && binaryOperators[level].indexOf(token.value) >= 0)
            return token.value;
        
        if (token)
            lexer.pushToken(token);
    }
    
    function parseTerm() {
        const token = lexer.nextToken();
        
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
            const expr = self.parse();
            
            parseToken(TokenType.Delimiter, ')');
            
            return expr;
        }

        if (token.type === TokenType.Delimiter && token.value === '[') {
            const exprs = [];
            
            while (!tryParseToken(TokenType.Delimiter, ']')) {
                if (exprs.length)
                    parseToken(TokenType.Delimiter, ',');
                
                exprs.push(self.parse());
            }

            return expressions.list(exprs);
        }

        if (token.type === TokenType.Delimiter && token.value === '{') {
            const exprs = [];
            
            while (!tryParseToken(TokenType.Delimiter, '}')) {
                if (exprs.length)
                    parseToken(TokenType.Delimiter, ',');
                
                exprs.push(self.parse());
            }
            
            return expressions.tuple(exprs);
        }
        
        lexer.pushToken(token);
    }
    
    function isUpperCaseLetter(ch) {
        return ch >= 'A' && ch <= 'Z';
    }
    
    function parseToken(type, value) {
        const token = lexer.nextToken();
        
        if (!token || token.type !== type || token.value !== value)
            throw new Error("Expected '" + value + "'");
    }

    function tryParseToken(type, value) {
        const token = lexer.nextToken();
        
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