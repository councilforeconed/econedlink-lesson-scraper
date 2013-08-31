var request = require('request');
var nano = require('nano')('http://localhost:5984');

var db = nano.use('cee_portfolio');

var ActiveLessonStream = require('./lib/streams/active-lesson-stream.js');
var LessonInfoStream = require('./lib/streams/lesson-info-stream.js');
var ApplyEconomicsStandards = require('./lib/streams/apply-econ-standards-stream.js');
var ApplyPersonalFinanceStandards = require('./lib/streams/apply-personal-finance-standards-stream.js');
var ApplyPrefixToLessonIDStream = require('./lib/streams/append-prefix-stream.js');

ActiveLessonStream()
  .pipe(LessonInfoStream())
  .pipe(ApplyEconomicsStandards())
  .pipe(ApplyPersonalFinanceStandards())
  .pipe(ApplyPrefixToLessonIDStream())
  .on('data', function (data) {
    db.insert(data);
    console.log(data);
  });
