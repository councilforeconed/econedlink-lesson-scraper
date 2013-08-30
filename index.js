var ActiveLessonStream = require('./lib/streams/active-lesson-stream.js');
var LessonInfoStream = require('./lib/streams/lesson-info-stream.js');
var ApplyEconomicsStandards = require('./lib/streams/apply-econ-standards-stream.js');
var ApplyPersonalFinanceStandards = require('./lib/streams/apply-personal-finance-standards-stream.js');

ActiveLessonStream()
  .pipe(LessonInfoStream())
  .pipe(ApplyEconomicsStandards())
  .pipe(ApplyPersonalFinanceStandards())
  .on('data', function (data) {
    console.log(data);
  });
