module.exports = function (response) {
  return JSON.parse(response.substring(2, response.length-1))[0].results;
};