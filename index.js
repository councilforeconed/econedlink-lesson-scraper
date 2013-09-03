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
    // Put whatever you want to do with the formatted data here.
    // TODO: Abstract this out into a different function.
    db.insert(data, data._id, function (err, body) {
      if (err) {
        db.get(data._id, function (err, body) {
          if (!err) {
            data._rev = body._rev;
            db.insert(data, data._id, function (err, body) {
              if (!err) {
                console.log("Success:", body);
              } else {
                console.error(err);
              }
            });
          } else {
            console.error(err);
          }
        })
      };
      if (!err) console.log("Success:", data);
    });
  });