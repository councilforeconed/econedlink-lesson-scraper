var assert = require('assert');
var scrape = require('../../lib/scrapers/scrape-econ-standards');

describe('Economics standard scraper', function(){
  it('should return an array', function(done){
    scrape(null, { id: 1100 }, function (err, body) {
      assert.ok(Array.isArray(body));
      done();
    });
  });
});