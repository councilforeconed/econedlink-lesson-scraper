var ActiveLessonStream = require('./lib/streams/active-lesson-stream.js');
var LessonInfoStream = require('./lib/streams/lesson-info-stream.js');
var ApplyEconomicsStandards = require('./lib/streams/apply-econ-standards-stream.js');
var ApplyPersonalFinanceStandards = require('./lib/streams/apply-personal-finance-standards-stream.js');
var ApplyPrefixToLessonIDStream = require('./lib/streams/append-prefix-stream.js');
var couchify = require('./lib/send-to-couch');

ActiveLessonStream("interactives")
  .pipe(LessonInfoStream())
  .pipe(ApplyEconomicsStandards())
  .pipe(ApplyPersonalFinanceStandards())
  .pipe(ApplyPrefixToLessonIDStream())
  .on('data', couchify);