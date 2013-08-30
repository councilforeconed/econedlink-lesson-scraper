var assert = require('assert');
var parse = require('../../lib/parsers');

var example = '?([{"results":{"title":["San Francisco Area Transit Strike | EconEdLink"],"grades":["Grades: 6-8, 9-12","Author: Council for Economic Education Technology Staff","Posted: September 15, 1997","Updated: February 11, 2008"]},"created":"2013-08-30T14:35:36.592Z"}])'

describe('Response parser', function(){
  var parsed = parse.basicInfo(example);
  
  it('should return an object', function(){
    assert.equal(Object.prototype.toString.call(parsed), '[object Object]');
  });
  
  it('should have a title', function(){
    assert.ok(parsed.title);
  });
  
  it('should should have grades', function(){
    assert.ok(parsed.grades);
  });
  
  it('should apply a lesson ID if provided', function(){
    var parsedWithID = parse.basicInfo(example, 1);
    assert.ok(parsedWithID.id);
    assert.equal(parsedWithID.id, 1);
  });
});