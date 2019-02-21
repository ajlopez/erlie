
const lexers = require('../lib/lexers');
const TokenType = lexers.TokenType;

exports['create lexer as object'] = function (test) {
    const lexer = lexers.lexer('foo');
    
    test.ok(lexer);
    test.equal(typeof lexer, 'object');
};

exports['first token'] = function (test) {
    const lexer = lexers.lexer('foo');
  
    const token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['no token in empty string'] = function (test) {
    const lexer = lexers.lexer('');
    
    test.equal(lexer.nextToken(), null);
};

exports['name skipping spaces'] = function (test) {
    const lexer = lexers.lexer('  foo   ');
  
    const token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['quoted name'] = function (test) {
    const lexer = lexers.lexer("'foo'");
  
    const token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, "'foo'");
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['two names'] = function (test) {
    const lexer = lexers.lexer('foo bar');
  
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
    const lexer = lexers.lexer('42');
  
    const token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '42');
    test.equal(token.type, TokenType.Number);
    
    test.equal(lexer.nextToken(), null);
};

exports['semicolon as delimiter'] = function (test) {
    const lexer = lexers.lexer(';');
  
    const token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, ';');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.nextToken(), null);
};

exports['vertical bar as delimiter'] = function (test) {
    const lexer = lexers.lexer('|');
  
    const token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '|');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.nextToken(), null);
};

exports['colon as delimiter'] = function (test) {
    const lexer = lexers.lexer(':');
  
    const token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, ':');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.nextToken(), null);
};

exports['comma as delimiter'] = function (test) {
    const lexer = lexers.lexer(',');
  
    const token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, ',');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.nextToken(), null);
};

exports['parentheses as delimiters'] = function (test) {
    const lexer = lexers.lexer('()');
  
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
    const lexer = lexers.lexer('.');
  
    const token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '.');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.nextToken(), null);
};

exports['name and delimiter'] = function (test) {
    const lexer = lexers.lexer('foo;');
  
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
    const lexer = lexers.lexer('_foo');
  
    const token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '_foo');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['name having underscore'] = function (test) {
    const lexer = lexers.lexer('foo_bar');
  
    const token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'foo_bar');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['name having underscore and digits'] = function (test) {
    const lexer = lexers.lexer('foo_42');
  
    const token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'foo_42');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['name with at'] = function (test) {
    const lexer = lexers.lexer('foo@bar');
  
    const token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'foo@bar');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['string'] = function (test) {
    const lexer = lexers.lexer('"foo"');
  
    const token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.String);
    
    test.equal(lexer.nextToken(), null);
};

exports['string and name'] = function (test) {
    const lexer = lexers.lexer('"foo" bar');
  
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
    const lexer = lexers.lexer('+');
  
    const token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '+');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.nextToken(), null);
};

exports['= as operator'] = function (test) {
    const lexer = lexers.lexer('=');
  
    const token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '=');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.nextToken(), null);
};

exports['{} as delimiters'] = function (test) {
    const lexer = lexers.lexer('{}');
  
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

exports['[] as delimiters'] = function (test) {
    const lexer = lexers.lexer('[]');
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '[');
    test.equal(token.type, TokenType.Delimiter);
  
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, ']');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.nextToken(), null);
};

exports['arithmetic operators'] = function (test) {
    const operators = '+-*/';
    const lexer = lexers.lexer(operators);
  
    for (var k = 0; k < operators.length; k++) {            
        const token = lexer.nextToken();
        
        test.ok(token);
        test.equal(token.value, operators[k]);
        test.equal(token.type, TokenType.Operator);
    }
    
    test.equal(lexer.nextToken(), null);
};

exports['div and rem as operators'] = function (test) {
    const operators = 'div rem';
    const lexer = lexers.lexer(operators);
  
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
    const operators = 'bor band';
    const lexer = lexers.lexer(operators);
  
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
