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

// We only need the MySQL server for one query, but it emits a fatal error
// when it times out. This event handler below prevents that error from
// killing the process.

db.on('error', function(err) {
  console.log('Database error:', err);
  if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
    console.log("The connection was closed. It's okay. Moving right along.");
  } else {
    throw err;
  }
});