module.exports = function (title) {
  return title.substring(0, title.indexOf('|') - 1);
};