var nano = require('nano')('http://localhost:5984');
var _ = require('lodash');

var db = nano.use('cee_portfolio');

module.exports = function (data) {
  db.insert(data, data._id, function (err, body) {
    if (err) {
      db.get(data._id, function (err, body) {
        if (!err) {
          data._rev = body._rev;
          if (!_.isEqual(body, data)) {
            db.insert(data, data._id, function (err, body) {
              if (!err) {
                console.log("Success:", body, data);
              } else {
                console.error(err);
              }
            });
          }
        } else {
          console.error(err);
        }
      })
    };
    if (!err) console.log("Success:", data);
  });
};