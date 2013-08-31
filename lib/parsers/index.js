var checkNumerality = require('./check-numerality');
var parseGrades = require('./parse-grades');
var parseStandards = require('./parse-standards');
var parseTitle = require('./parse-title');
var parseResponse = require('./parse-response');
var parseRequest = require('./parse-request');
var parseBasicInfo = require('./parse-basic-info');

module.exports = {
 grades: parseGrades,  
 standards: parseStandards,
 title: parseTitle,
 numerality: checkNumerality,
 response: parseResponse,
 basicInfo: parseBasicInfo,
 request: parseRequest
};