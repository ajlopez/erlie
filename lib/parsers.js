
const lexers = require('./lexers');
const atoms = require('./atoms');

const gepars = require('gepars');
const geast = require('geast');

geast.node('atom', [ 'name' ]);
geast.node('variable', [ 'name' ]);
geast.node('match', [ 'left', 'right' ]);
geast.node('tuple', [ 'expressions' ]);
geast.node('list', [ 'expressions' ]);

function isVariableName(name) {
    return name[0] === '_' || name[0] >= 'A' && name[0] <= 'Z';
}

const pdef = gepars.definition();

// expressions
pdef.define('expression', 'expression3');
pdef.define('expression3', [ 'expression3', 'operator:=', 'expression1' ], function (values) { return geast.match(values[0], values[2]); });
pdef.define('expression3', 'expression2');
pdef.define('expression2', [ 'expression2', 'operator:+', 'expression1' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression2', [ 'expression2', 'operator:-', 'expression1' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression2', 'expression1');
pdef.define('expression1', [ 'expression1', 'operator:*', 'term' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression1', [ 'expression1', 'operator:/', 'term' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression1', 'term');

// simple terms
pdef.define('term', 'name');
pdef.define('term', 'number');
pdef.define('term', 'string');
pdef.define('term', 'tuple');
pdef.define('term', 'list');
pdef.define('term', 'name:', function (value) { return isVariableName(value) ? geast.variable(value) : geast.atom(value); });
pdef.define('term', 'qname:', function (value) { return geast.atom(value); });
pdef.define('term', [ 'delimiter:(', 'expression', 'delimiter:)' ], function (values) { return values[1]; });
pdef.define('tuple', [ 'delimiter:{', 'expressionlist', 'delimiter:}' ], function (values) { return geast.tuple(values[1]); });
pdef.define('list', [ 'delimiter:[', 'expressionlist', 'delimiter:]' ], function (values) { return geast.list(values[1]); });
pdef.define('number', 'number:', function (value) { return geast.constant(parseFloat(value)); });
pdef.define('string', 'string:', function (value) { return geast.constant(value); });

pdef.define('expressionlist', [ '!', 'delimiter:}' ], function (values) { return values; });
pdef.define('expressionlist', [ '!', 'delimiter:]' ], function (values) { return values; });
pdef.define('expressionlist', 'expression', function (value) { return [ value ]; });
pdef.define('expressionlist', [ 'expressionlist', 'delimiter:,', 'expression' ], function (values) { values[0].push(values[2]); return values[0]; });

function parseNode(type, text) {
    const lexer = lexers.lexer(text);
    const parser = pdef.parser(lexer);
    
    return parser.parse(type);
}

module.exports = {
    parse: parseNode
};

