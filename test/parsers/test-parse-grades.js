var assert = require('assert');
var parse = require('../../lib/parsers');

describe('Grade parser', function () {
  it('should take a string with a grade range and return an array', function () {
    var grades = "Grades: 3-5";
    assert.deepEqual(parse.grades(grades), ["3-5"]);
  });
  
  it('should take a string with multiple grade ranges and separate them on the comma', function () {
    var grades = "Grades: 3-5, 6-8";
    assert.deepEqual(parse.grades(grades), ["3-5", "6-8"])
  });
});