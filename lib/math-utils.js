const add = function(a, b){
  return a + b;
};

const sub = function(a, b){
  return a - b;
};

const multiply = function(a, b){
  return a * b;
};

const quotient = function(a, b){
  return a / b;
};

const remainder = function(a, b){
  return a % b;
};

const power = function(a, b){
  return a ** b;
};

const factorial = function(n){
  if(n === 0){
    return 1;
  }
  return n * factorial(n - 1);
}

exports.quotient = quotient;
exports.remainder = remainder;
exports.power = power;
exports.factorial = factorial;

