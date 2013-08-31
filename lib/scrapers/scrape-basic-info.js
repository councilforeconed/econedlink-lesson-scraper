var request = require('request');
var parse = require('../parsers');

module.exports = function (err, lesson, callback) {
  if (err) callback(err);
  var query = {
                url: 'http://econedlink.org/e' + lesson.id,
                type: 'html',
                map: {
                  title: {
                    selector: 'title',
                    extract: 'text'
                  },
                  grades: {
                    selector: 'section#lesson-detail p',
                    extract: 'text'
                  },
                  concepts: {
                    selector: '.lesson-summary p a[target="pop"]',
                    extract: 'text'
                  }
                }
              };
  
  request(parse.request(query), function (err, response, body) {
    callback(null, parse.basicInfo(body, lesson));
  });
  
};