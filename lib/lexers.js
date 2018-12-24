
var TokenType = { Name: 1, Number: 2, String: 3, Operator: 4, Delimiter: 5 };
var delimiters = ';,().';
var operators = [ '+', '-', '*', '/', 'div', 'rem', 'bor', 'band' ];

function Lexer(text) {
    var p = 0;
    var l = text.length;
    var tokens = [];
    
    this.pushToken = function (token) {
        tokens.push(token);
    }
    
    this.nextToken = function () {
        if (tokens.length)
            return tokens.pop();
        
        while (p < l && text[p] <= ' ')
            p++;
        
        if (p >= l)
            return null;
        
        var ch = text[p++];
        
        if (isDelimiter(ch))
            return { value: ch, type: TokenType.Delimiter };

        if (isOperator(ch))
            return { value: ch, type: TokenType.Operator };
        
        if (isDigit(ch))
            return nextNumber(ch);
        
        if (isNameFirstCharacter(ch))
            return nextName(ch);
        
        if (ch === '"')
            return nextString();

        if (ch === "'")
            return nextQuotedName(ch);
    };
    
    function nextQuotedName(value) {
        while (p < l && text[p] !== "'")
            value += text[p++];
        
        if (p < l)
           value += text[p++];
        
        return { value: value, type: TokenType.Name }
    }
    
    function nextString() {
        var value = '';
        
        while (p < l && text[p] !== '"')
            value += text[p++];
        
        if (p < l)
           p++;
        
        return { value: value, type: TokenType.String }
    }
    
    function nextNumber(value) {
        while (p < l && isDigit(text[p]) > ' ')
            value += text[p++];
        
        return { value: value, type: TokenType.Number }; 
    }
    
    function nextName(value) {
        while (p < l && isNameCharacter(text[p]))
            value += text[p++];

        if (operators.indexOf(value) >= 0)
            return { value: value, type: TokenType.Operator };
            
        return { value: value, type: TokenType.Name };
    }
    
    function isNameFirstCharacter(ch) {
        return ch === '_' || isLetter(ch);
    }
    
    function isNameCharacter(ch) {
        return ch === '_' || ch === '@' || isLetter(ch) || isDigit(ch);
    }
    
    function isLetter(ch) {
        return ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z';
    }
    
    function isDigit(ch) {
        return ch >= '0' && ch <= '9';
    }
    
    function isDelimiter(ch) {
        return delimiters.indexOf(ch) >= 0;
    }
    
    function isOperator(ch) {
        return operators.indexOf(ch) >= 0;
    }
}

function createLexer(text) {
    return new Lexer(text);
}

module.exports = {
    lexer: createLexer,
    TokenType: TokenType
}