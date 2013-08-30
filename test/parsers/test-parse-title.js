var assert = require('assert');
var parse = require('../../lib/parsers');

describe('Title parser', function () {
  it('should strip away the "| EconEdLink" at the end of a page title', function () {
    var title = "Goods and Services: Some are Private, Some are Not | EconEdLink";
    var expected = "Goods and Services: Some are Private, Some are Not";
    assert.equal(parse.title(title), expected);
  });
});