module.exports = function (item, callback) {
  if (typeof item == "number") {
    callback(true);
  } else {
    callback(false);
  }
};