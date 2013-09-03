var request = require('request');
var parse = require('../parsers');

module.exports = function (err, lesson, callback) {
  if (err) callback(err);
  
  var urlBase, conceptSelector;
  
  if (lesson.type === "interactive") {
    urlBase = 'http://econedlink.org/i';
    conceptSelector = '.lesson-detail p a[target="pop"]';
  } else {
    urlBase = 'http://econedlink.org/e';
    conceptSelector = '.lesson-summary p a[target="pop"]';
  }
  
  var query = {
                url: urlBase + lesson.id,
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
                    selector: conceptSelector,
                    extract: 'text'
                  }
                }
              };
  
  request(parse.request(query), function (err, response, body) {
    callback(null, parse.basicInfo(body, lesson));
  });
  
};