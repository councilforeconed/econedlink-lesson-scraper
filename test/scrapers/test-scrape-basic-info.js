var assert = require('assert');
var scrapeBasicInfo = require('../../lib/scrapers').basicInfo;

describe('Lesson scraper', function () {
  it('should return an object', function (done) {
    scrapeBasicInfo(null, { id: 1 }, function (err, result) {
      if (err) done(err);
      assert.equal(typeof result, 'object');
      done();
    });
  });
  
  it('should have an ID property', function (done) {
    scrapeBasicInfo(null, { id: 1 }, function (err, result) {
      if (err) done(err);
      assert.ok(result.id);
      done();
    });
  });
  
  it('should constain "EconEdLink" as the source', function (done) {
    scrapeBasicInfo(null, { id: 1 }, function (err, result) {
      if (err) done(err);
      assert.equal(result.source, "EconEdLink");
      done();
    });
  });
});