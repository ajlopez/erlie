
var TokenType = { Name: 1, Number: 2, Delimiter: 3 };
var delimiters = ';,';

function Lexer(text) {
    var p = 0;
    var l = text.length;
    
    this.nextToken = function () {
        while (p < l && text[p] <= ' ')
            p++;
        
        if (p >= l)
            return null;
        
        if (isDelimiter(text[p]))
            return { value: text[p++], type: TokenType.Delimiter };
        
        var value = '';
        
        if (isDigit(text[p])) {
            while (p < l && isDigit(text[p]) > ' ')
                value += text[p++];
            
            return { value: value, type: TokenType.Number }; 
        }
        
        while (p < l && text[p] > ' ' && !isDelimiter(text[p]))
            value += text[p++];
        
        return { value: value, type: TokenType.Name }; 
    };
    
    function isDigit(ch) {
        return ch >= '0' && ch <= '9';
    }
    
    function isDelimiter(ch) {
        return delimiters.indexOf(ch) >= 0;
    }
}

function createLexer(text) {
    return new Lexer(text);
}

module.exports = {
    lexer: createLexer,
    TokenType: TokenType
}