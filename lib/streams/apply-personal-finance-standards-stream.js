var inherits = require('util').inherits;
var Transform = require('stream').Transform || require('readable-stream/transform');
var scrape = require('../scrapers/scrape-personal-finance-standards');
  
function ApplyPersonalFinanceStandards(options) {
  if (!(this instanceof ApplyPersonalFinanceStandards)) {
    return new ApplyPersonalFinanceStandards(options);
  }
  
  if (!options) { options = {}; }
  options.objectMode = true;
 
  Transform.call(this, options);
}

inherits(ApplyPersonalFinanceStandards, Transform);

ApplyPersonalFinanceStandards.prototype._transform = function (lesson, encoding, callback) {
  var self = this;
  scrape(null, lesson, function (err, standards) {
    lesson.personalFinanceStandards = standards;
    self.push(lesson);
    callback();
  });
};
 
module.exports = ApplyPersonalFinanceStandards;