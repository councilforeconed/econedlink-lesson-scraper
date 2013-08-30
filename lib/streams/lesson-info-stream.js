var inherits = require('util').inherits;
var Transform = require('stream').Transform || require('readable-stream/transform');
var scrape = require('../scrapers');
  
function LessonInfoStream(options) {
  if (!(this instanceof LessonInfoStream)) {
    return new LessonInfoStream(options);
  }
  
  if (!options) { options = {}; }
  options.objectMode = true;
 
  Transform.call(this, options);
}

inherits(LessonInfoStream, Transform);

LessonInfoStream.prototype._transform = function (lesson, encoding, callback) {
  var self = this;
  scrape.basicInfo(null, lesson, function (err, lesson) {
    self.push(lesson);
    callback();
  });
};
 
module.exports = LessonInfoStream;