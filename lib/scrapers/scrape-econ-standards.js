var request = require('request');
var parse = require('../parsers');

var urlBase;

module.exports = function (err, lesson, callback) {
  if (err) callback(err);
  
  var urlBase;
  
  if (lesson.type === "interactive") {
    urlBase = 'http://www.econedlink.org/economic-standards/standards-by-resource.php?educatorState=nat&iid=';
  } else {
    urlBase = 'http://www.econedlink.org/economic-standards/standards-by-resource.php?educatorState=nat&lid=';
  }
  
  var query = {
                url: urlBase + lesson.id,
                type: 'html',
                selector: 'p.standard-number a',
                extract: 'text'
              };

  request(parse.request(query), function (err, response, body) {
    callback(null, parse.standards(parse.response(body)));
  });
};