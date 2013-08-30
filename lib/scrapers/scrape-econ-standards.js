var request = require('request');
var parse = require('../parsers');

module.exports = function (err, lesson, callback) {
  if (err) callback(err);
  var query = {
                url: 'http://www.econedlink.org/economic-standards/standards-by-resource.php?educatorState=nat&lid=' + lesson.id,
                type: 'html',
                selector: 'p.standard-number a',
                extract: 'text'
              };

  request(parse.request(query), function (err, response, body) {
    callback(null, parse.standards(parse.response(body)));
  });
};