var assert = require('assert');
var parseResponse = require('../../lib/parsers').response;

var example = '?([{"results":{"title":["San Francisco Area Transit Strike | EconEdLink"],"grades":["Grades: 6-8, 9-12","Author: Council for Economic Education Technology Staff","Posted: September 15, 1997","Updated: February 11, 2008"]},"created":"2013-08-30T14:35:36.592Z"}])'

describe('Response parser', function(){
  it('should return an object', function(){
    console.log(example)
    assert.equal(Object.prototype.toString.call(parseResponse(example)), '[object Object]');
  });
});