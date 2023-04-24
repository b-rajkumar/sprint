const code = require('./sprint-code.js');
const getInput = function() {
  input = code.sprintCode.replaceAll('\n', ' ');
  input = input.replace(/  */g, ' ');
  input = input.replace(/: */g, ':');
  return input.split(' ');
};

const findLabels = function(input) {
  return input.reduce(function(labels, element, index){

    if(element.includes(':')) {
      const entry = element.split(':');
      labels[entry[0]] = index + 1;
      input[index] = entry[1];
    } 

    return labels;
  }, {});
};

const loadMemory = function(memory, labels, input) {
  for(let cell = 0; cell < input.length; cell++) {
    const number = toNumber(input[cell]);

    if(isNaN(number)) {
      if(labels[input[cell]] === undefined) {
        throwError(input[cell]);
      }
      input[cell] = labels[input[cell]];
    }
    memory[cell + 1] = toNumber(input[cell]);
  }
};

const toNumber = function(stringNum) {
  return +stringNum;
};

const throwError = function(index) {
  console.error(index, 'is not defined!');
  process.exit(1);
};

const getValue = function(memory, index) {
  if(memory[index] === undefined) {
    throwError(index);
  }
  return memory[index];
};

const put = function(value, memory, index) {
  memory[index] = value;
};

const assign = function(memory, index) {
  const value = getValue(memory, index + 1); 
  const memLocation = getValue(memory, index + 2); 
  put(value, memory, memLocation);

  return index + 3;
};

const copy = function(memory, index) {
  const value = getValue(memory, getValue(memory, index + 1)) ;
  put(value, memory, getValue(memory, index + 2));

  return index + 3;
};

const add = function(memory, index) {
  const firstValue = getValue(memory, getValue(memory, index + 1)) ;
  const secondValue = getValue(memory, getValue(memory, index + 2)) ;
  const memLocation = getValue(memory, index + 3);
  put(firstValue + secondValue, memory, memLocation); 

  return index + 4;
};

const sub = function(memory, index) {
  const firstValue = getValue(memory, getValue(memory, index + 1)) ;
  const secondValue = getValue(memory, getValue(memory, index + 2)) ;
  const memLocation = getValue(memory, index + 3);
  put(firstValue - secondValue, memory, memLocation); 

  return index + 4;
};

const jump = function(memory, index) {
  return getValue(memory, index + 1);
};

const jumpIfLesser = function(memory, index) {
  const firstValue = getValue(memory, getValue(memory, index + 1)) ;
  const secondValue = getValue(memory, getValue(memory, index + 2)) ;

  if(firstValue < secondValue) {
    return getValue(memory, index + 3);
  }

  return index + 4;
};

const jumpIfEqual = function(memory, index) {
  const firstValue = getValue(memory, getValue(memory, index + 1)) ;
  const secondValue = getValue(memory, getValue(memory, index + 2)) ;

  if(firstValue === secondValue) {
    return getValue(memory, index + 3);
  }

  return index + 4;
};

const halt = function(memory) {
  console.log(memory);
  process.exit(0);
};

const operations = {
  '0': assign,
  '1': add, 
  '2': sub, 
  '3': jump, 
  '4': jumpIfEqual, 
  '5': jumpIfLesser, 
  '7': copy, 
  '9': halt
};

const executeCode = function(memory) {
  let index = 1;
  while(index < Object.keys(memory).length) {
    const operation = operations[memory[index]];
    if(operation === undefined) {
      throwError(index);
    }
    index = operation(memory, index);
  }
};

const run = function() {
  const memory = {};
  const input = getInput();
  const labels = findLabels(input);
  loadMemory(memory, labels, input);
  executeCode(memory);
};

run();
