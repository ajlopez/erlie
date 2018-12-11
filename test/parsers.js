
var parsers = require('../lib/parsers');

exports['create parser as object'] = function (test) {
    var parser = parsers.parser('foo');
    
    test.ok(parser);
    test.equal(typeof parser, 'object');
};

exports['parse integer constant'] = function (test) {
    var parser = parsers.parser('42');
    
    var result = parser.parse();
    
    test.ok(result);
    test.equal(result.evaluate(), 42);
};

