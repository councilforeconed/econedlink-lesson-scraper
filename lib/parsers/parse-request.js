module.exports = function (query) {
  return 'http://localhost:8888/?q=' + encodeURIComponent(JSON.stringify(query)) + '&callback=?';
}