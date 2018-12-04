
var lexers = require('../lib/lexers');
var TokenType = lexers.TokenType;

exports['create lexer as object'] = function (test) {
    var lexer = lexers.lexer('foo');
    
    test.ok(lexer);
    test.equal(typeof lexer, 'object');
};

exports['first token'] = function (test) {
    var lexer = lexers.lexer('foo');
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['no token in empty string'] = function (test) {
    var lexer = lexers.lexer('');
    
    test.equal(lexer.nextToken(), null);
};

exports['name skipping spaces'] = function (test) {
    var lexer = lexers.lexer('  foo   ');
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};