
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

exports['quoted name'] = function (test) {
    var lexer = lexers.lexer("'foo'");
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, "'foo'");
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['two names'] = function (test) {
    var lexer = lexers.lexer('foo bar');
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'bar');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['number'] = function (test) {
    var lexer = lexers.lexer('42');
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '42');
    test.equal(token.type, TokenType.Number);
    
    test.equal(lexer.nextToken(), null);
};

exports['semicolon as delimiter'] = function (test) {
    var lexer = lexers.lexer(';');
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, ';');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.nextToken(), null);
};

exports['comma as delimiter'] = function (test) {
    var lexer = lexers.lexer(',');
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, ',');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.nextToken(), null);
};

exports['parentheses as delimiters'] = function (test) {
    var lexer = lexers.lexer('()');
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '(');
    test.equal(token.type, TokenType.Delimiter);
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, ')');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.nextToken(), null);
};

exports['dot as delimiter'] = function (test) {
    var lexer = lexers.lexer('.');
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '.');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.nextToken(), null);
};

exports['name and delimiter'] = function (test) {
    var lexer = lexers.lexer('foo;');
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, ';');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.nextToken(), null);
};

exports['name starting with underscore'] = function (test) {
    var lexer = lexers.lexer('_foo');
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '_foo');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['name having underscore'] = function (test) {
    var lexer = lexers.lexer('foo_bar');
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'foo_bar');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['name having underscore and digits'] = function (test) {
    var lexer = lexers.lexer('foo_42');
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'foo_42');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['name with at'] = function (test) {
    var lexer = lexers.lexer('foo@bar');
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'foo@bar');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['string'] = function (test) {
    var lexer = lexers.lexer('"foo"');
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.String);
    
    test.equal(lexer.nextToken(), null);
};

exports['string and name'] = function (test) {
    var lexer = lexers.lexer('"foo" bar');
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.String);
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'bar');
    
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['+ as operator'] = function (test) {
    var lexer = lexers.lexer('+');
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '+');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.nextToken(), null);
};

exports['= as operator'] = function (test) {
    var lexer = lexers.lexer('=');
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '=');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.nextToken(), null);
};

exports['{} as delimiters'] = function (test) {
    var lexer = lexers.lexer('{}');
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '{');
    test.equal(token.type, TokenType.Delimiter);
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '}');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.nextToken(), null);
};

exports['arithmetic operators'] = function (test) {
    var operators = '+-*/';
    var lexer = lexers.lexer(operators);
  
    for (var k = 0; k < operators.length; k++) {            
        var token = lexer.nextToken();
        
        test.ok(token);
        test.equal(token.value, operators[k]);
        test.equal(token.type, TokenType.Operator);
    }
    
    test.equal(lexer.nextToken(), null);
};

exports['div and rem as operators'] = function (test) {
    var operators = 'div rem';
    var lexer = lexers.lexer(operators);
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'div');
    test.equal(token.type, TokenType.Operator);
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'rem');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.nextToken(), null);
};

exports['bor and band as operators'] = function (test) {
    var operators = 'bor band';
    var lexer = lexers.lexer(operators);
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'bor');
    test.equal(token.type, TokenType.Operator);
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'band');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.nextToken(), null);
};
