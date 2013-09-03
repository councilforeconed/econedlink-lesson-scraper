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
  if (lesson.type === "interactive") {
    lesson._id = "econedlink-interactive" + lesson.id
  } else {
    lesson._id = "econedlink" + lesson.id;
    lesson.type = 'lesson';
  }
  lesson.format = 'online';
  this.push(lesson);
  callback();
};
 
module.exports = ApplyPrefixToLessonIDStream;