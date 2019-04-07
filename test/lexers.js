
const lexers = require('../lib/lexers');
const TokenType = lexers.TokenType;

exports['create lexer as object'] = function (test) {
    const lexer = lexers.lexer('foo');
    
    test.ok(lexer);
    test.equal(typeof lexer, 'object');
};

exports['first token'] = function (test) {
    const lexer = lexers.lexer('foo');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
};

exports['no token in empty string'] = function (test) {
    const lexer = lexers.lexer('');
    
    test.equal(lexer.next(), null);
};

exports['name skipping spaces'] = function (test) {
    const lexer = lexers.lexer('  foo   ');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
};

exports['quoted name'] = function (test) {
    const lexer = lexers.lexer("'foo'");
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "foo");
    test.equal(token.type, TokenType.QName);
    
    test.equal(lexer.next(), null);
};

exports['two names'] = function (test) {
    const lexer = lexers.lexer('foo bar');
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'bar');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
};

exports['number'] = function (test) {
    const lexer = lexers.lexer('42');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '42');
    test.equal(token.type, TokenType.Number);
    
    test.equal(lexer.next(), null);
};

exports['semicolon as delimiter'] = function (test) {
    const lexer = lexers.lexer(';');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, ';');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
};

exports['vertical bar as delimiter'] = function (test) {
    const lexer = lexers.lexer('|');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '|');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
};

exports['colon as delimiter'] = function (test) {
    const lexer = lexers.lexer(':');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, ':');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
};

exports['comma as delimiter'] = function (test) {
    const lexer = lexers.lexer(',');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, ',');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
};

exports['parentheses as delimiters'] = function (test) {
    const lexer = lexers.lexer('()');
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '(');
    test.equal(token.type, TokenType.Delimiter);
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, ')');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
};

exports['dot as delimiter'] = function (test) {
    const lexer = lexers.lexer('.');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '.');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
};

exports['name and delimiter'] = function (test) {
    const lexer = lexers.lexer('foo;');
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, ';');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
};

exports['name starting with underscore'] = function (test) {
    const lexer = lexers.lexer('_foo');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '_foo');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
};

exports['name having underscore'] = function (test) {
    const lexer = lexers.lexer('foo_bar');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo_bar');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
};

exports['name having underscore and digits'] = function (test) {
    const lexer = lexers.lexer('foo_42');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo_42');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
};

exports['name with at'] = function (test) {
    const lexer = lexers.lexer('foo@bar');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo@bar');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
};

exports['string'] = function (test) {
    const lexer = lexers.lexer('"foo"');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.String);
    
    test.equal(lexer.next(), null);
};

exports['string and name'] = function (test) {
    const lexer = lexers.lexer('"foo" bar');
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.String);
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'bar');
    
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
};

exports['+ as operator'] = function (test) {
    const lexer = lexers.lexer('+');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '+');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
};

exports['= as operator'] = function (test) {
    const lexer = lexers.lexer('=');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '=');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
};

exports['{} as delimiters'] = function (test) {
    const lexer = lexers.lexer('{}');
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '{');
    test.equal(token.type, TokenType.Delimiter);
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '}');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
};

exports['[] as delimiters'] = function (test) {
    const lexer = lexers.lexer('[]');
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '[');
    test.equal(token.type, TokenType.Delimiter);
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, ']');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
};

exports['arithmetic operators'] = function (test) {
    const operators = '+-*/';
    const lexer = lexers.lexer(operators);
  
    for (var k = 0; k < operators.length; k++) {            
        const token = lexer.next();
        
        test.ok(token);
        test.equal(token.value, operators[k]);
        test.equal(token.type, TokenType.Operator);
    }
    
    test.equal(lexer.next(), null);
};

exports['div and rem as operators'] = function (test) {
    const operators = 'div rem';
    const lexer = lexers.lexer(operators);
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'div');
    test.equal(token.type, TokenType.Operator);
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'rem');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
};

exports['bor and band as operators'] = function (test) {
    const operators = 'bor band';
    const lexer = lexers.lexer(operators);
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'bor');
    test.equal(token.type, TokenType.Operator);
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'band');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
};
