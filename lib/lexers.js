
var TokenType = { Name: 1 };

function Lexer(text) {
    var p = 0;
    var l = text.length;
    
    this.nextToken = function () {
        while (p < l && text[p] <= ' ')
            p++;
        
        if (p >= l)
            return null;
        
        var value = '';
        
        while (p < l && text[p] > ' ')
            value += text[p++];
        
        return { value: value, type: TokenType.Name }; 
    };
}

function createLexer(text) {
    return new Lexer(text);
}

module.exports = {
    lexer: createLexer,
    TokenType: TokenType
}