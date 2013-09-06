var mysql = require('mysql');
var util = require('util');
var Readable = require('stream').Readable;

var db =  mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_EEL
});

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

module.exports = function (type) {
  var statement;

  if (type === "interactives") {
    statement = "SELECT interactive_tools.id, interactive_tools.title, name AS category, type AS media, 'interactive' AS type FROM interactive_types INNER JOIN interactive_tools ON interactive_tools.interactive_type_id = interactive_types.id";
  } else {
    statement = "SELECT lessons.id FROM lessons WHERE lessons.active = 'true' ORDER BY lessons.id ASC";
  }
  
  return db.query(statement).stream({highWaterMark: 5});
}