var inherits = require('util').inherits;
var Writable = require('stream').Writable || require('readable-stream/writable');
var nano = require('nano')('http://localhost:5984');

var db = nano.use('cee_portfolio');
  
function WriteToCouchStream(options) {
  if (!(this instanceof WriteToCouchStream)) {
    return new WriteToCouchStream(options);
  }
  
  if (!options) { options = {}; }
  options.objectMode = true;
 
  Writable.call(this, options);
}

inherits(WriteToCouchStream, Writable);

WriteToCouchStream.prototype._write = function (data, encoding, callback) {
  var self = this;
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
      callback();
    };
  });
};

 
module.exports = WriteToCouchStream;