
const gelex = require('gelex');

const ldef = gelex.definition();

ldef.define('operator', 'div rem bor band'.split(' '));
ldef.define('name', '[a-zA-Z_][a-zA-Z0-9_@]*');
ldef.defineText('qname', "'", "'");
ldef.define('number', '[0-9][0-9]*');
ldef.define('delimiter', ';,().{}[]|:'.split(''));
ldef.define('operator', '=+-*/'.split(''));
ldef.defineText('string', '"', '"');

const TokenType = { Name: 'name', QName: 'qname', Number: 'number', String: 'string', Operator: 'operator', Delimiter: 'delimiter' };

function createLexer(text) {
    return ldef.lexer(text);
}

module.exports = {
    lexer: createLexer,
    TokenType: TokenType
}
