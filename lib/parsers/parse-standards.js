module.exports = function (standards) {
  return unique(numberize(standards)).sort();
};

function unique(array) {
  return array.filter(function(element, i){
      return array.indexOf(element) == i; 
  });
};

function numberize(array) {
  return array.map(function (e) {
    return parseInt(e);
  });
}