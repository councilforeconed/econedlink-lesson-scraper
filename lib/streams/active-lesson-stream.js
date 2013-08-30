var mysql = require('mysql');
var util = require('util');
var Readable = require('stream').Readable;

var db =  mysql.createConnection({
  host     : '204.232.233.146',
  user     : 'skinney',
  password : '2SKvedBhQx9Q2',
  database : 'neweconedlink'
});

var statement = "SELECT lessons.id FROM lessons WHERE lessons.active = 'true' ORDER BY lessons.id ASC";
 
function ActiveLessonStream(options) {
  if (!(this instanceof ActiveLessonStream)) {
    return new ActiveLessonStream(options);
  }
  
  if (!options) { options = {}; }
  options.objectMode = true;
 
  Readable.call(this, options);
}
 
util.inherits(ActiveLessonStream, Readable);

ActiveLessonStream.prototype._read = function (size) {
  var self = this;
  db.query(statement, function (err, rows) {
    rows.forEach(function (row) {
      self.push(row);
    });
  });
};
 
module.exports = ActiveLessonStream;