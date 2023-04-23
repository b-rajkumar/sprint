const formatText = function(text, code){
  return "\033[" + code + "m" + text + "\033[0m"
};

const red = function(text){
  return formatText(text, 31);
};

const green = function(text){
  return formatText(text, 32);
};

const yellow = function(text){
  return formatText(text, 33);
};

const blue = function(text){
  return formatText(text, 34);
};

const purple = function(text){
  return formatText(text, 35);
};

const cyan = function(text){
  return formatText(text, 36);
};

const white = function(text){
  return formatText(text, 37);
};

const underline = function(text){
  return formatText(text, 4);
};

const bold = function(text){
  return formatText(text, 1);
};

const redBg = function(text){
  return formatText(text, 41);
};

const greenBg = function(text){
  return formatText(text, 42);
};

const yellowBg = function(text){
  return formatText(text, 43);
};

const blueBg = function(text){
  return formatText(text, 44);
};

const purpleBg = function(text){
  return formatText(text, 45);
};

const cyanBg = function(text){
  return formatText(text, 46);
};

const whiteBg = function(text){
  return formatText(text, 47);
};

const style = {red , blue, yellow, green, purple, cyan, redBg, greenBg, yellowBg, blueBg, purpleBg, cyanBg, bold, underline};

exports.red = red;
exports.yellow = yellow;
exports.blue = blue;
exports.cyan = cyan;
exports.green = green;
exports.purple = purple;
exports.white = white;

exports.redBg = redBg;
exports.yellowBg = yellowBg;
exports.blueBg = blueBg;
exports.cyanBg = cyanBg;
exports.greenBg = greenBg;
exports.purpleBg = purpleBg;
exports.whiteBg = whiteBg;

exports.underline = underline;
exports.bold = bold;
