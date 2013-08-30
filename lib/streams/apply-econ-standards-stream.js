var inherits = require('util').inherits;
var Transform = require('stream').Transform || require('readable-stream/transform');
var scrape = require('../scrapers/scrape-econ-standards');
  
function ApplyEconomicsStandards(options) {
  if (!(this instanceof ApplyEconomicsStandards)) {
    return new ApplyEconomicsStandards(options);
  }
  
  if (!options) { options = {}; }
  options.objectMode = true;
 
  Transform.call(this, options);
}

inherits(ApplyEconomicsStandards, Transform);

ApplyEconomicsStandards.prototype._transform = function (lesson, encoding, callback) {
  var self = this;
  scrape(null, lesson, function (err, standards) {
    if (!lesson.standards) lesson.standards = {}
    lesson.standards.economics = standards
    self.push(lesson);
    callback();
  });
};
 
module.exports = ApplyEconomicsStandards;