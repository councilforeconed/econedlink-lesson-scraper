var ActiveLessonStream = require('./streams/active-lesson-stream.js');
var LessonInfoStream = require('./streams/lesson-info-stream.js');
var ApplyEconomicsStandards = require('./streams/apply-econ-standards-stream.js');
var ApplyPersonalFinanceStandards = require('./streams/apply-personal-finance-standards-stream.js');
var ApplyPrefixToLessonIDStream = require('./streams/append-prefix-stream.js');
var couchify = require('./send-to-couch');

module.exports = function (type) {
  ActiveLessonStream(type)
    .pipe(LessonInfoStream())
    .pipe(ApplyEconomicsStandards())
    .pipe(ApplyPersonalFinanceStandards())
    .pipe(ApplyPrefixToLessonIDStream())
    .on('data', couchify);
}