var inherits = require('util').inherits;
var Transform = require('stream').Transform || require('readable-stream/transform');
  
function ApplyPrefixToLessonIDStream(options) {
  if (!(this instanceof ApplyPrefixToLessonIDStream)) {
    return new ApplyPrefixToLessonIDStream(options);
  }
  
  if (!options) { options = {}; }
  options.objectMode = true;
 
  Transform.call(this, options);
}

inherits(ApplyPrefixToLessonIDStream, Transform);

ApplyPrefixToLessonIDStream.prototype._transform = function (lesson, encoding, callback) {
  lesson.id = "econedlink" + lesson.id;
  this.push(lesson);
  callback();
};
 
module.exports = ApplyPrefixToLessonIDStream;