
var TokenType = { Name: 1, Number: 2 };

function Lexer(text) {
    var p = 0;
    var l = text.length;
    
    this.nextToken = function () {
        while (p < l && text[p] <= ' ')
            p++;
        
        if (p >= l)
            return null;
        
        var value = '';
        
        if (isDigit(text[p])) {
            while (p < l && isDigit(text[p]) > ' ')
                value += text[p++];
            
            return { value: value, type: TokenType.Number }; 
        }
        
        while (p < l && text[p] > ' ')
            value += text[p++];
        
        return { value: value, type: TokenType.Name }; 
    };
    
    function isDigit(ch) {
        return ch >= '0' && ch <= '9';
    }
}

function createLexer(text) {
    return new Lexer(text);
}

module.exports = {
    lexer: createLexer,
    TokenType: TokenType
}