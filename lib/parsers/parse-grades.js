module.exports = function (gradeString) {
  if (gradeString == undefined || gradeString == null) return []; 
  var grades =  gradeString.substring(gradeString.indexOf(':') + 2, gradeString.length);
  return grades.split(', ');
}