var ActiveLessonStream = require('./lib/streams/active-lesson-stream.js');
var LessonInfoStream = require('./lib/streams/lesson-info-stream.js');
var ApplyEconomicsStandards = require('./lib/streams/apply-econ-standards-stream.js');
var ApplyPersonalFinanceStandards = require('./lib/streams/apply-personal-finance-standards-stream.js');
var ApplyPrefixToLessonIDStream = require('./lib/streams/append-prefix-stream.js');
var WriteToCouchStream = require('./lib/streams/write-to-couch-stream.js');
var nano = require('nano')('http://localhost:5984');

var db = nano.use('cee_portfolio');

ActiveLessonStream("interactives")
  .pipe(LessonInfoStream())
  .pipe(ApplyEconomicsStandards())
  .pipe(ApplyPersonalFinanceStandards())
  .pipe(ApplyPrefixToLessonIDStream())
  .on('data', function (data) {
    db.insert(data, data._id, function (err, body) {
      if (err) {
        db.get(data._id, function (err, body) {
          if (!err) {
            data._rev = body._rev;
            db.insert(data, data._id, function (err, body) {
              if (!err) {
                console.log("Success:", body, data);
              } else {
                console.error(err);
              }
            });
          } else {
            console.error(err);
          }
        })
      };
      if (!err) {
        console.log("Success:", data);
      };
    });
  });