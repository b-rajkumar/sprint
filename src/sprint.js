const memory = {};
const labels = {};

const loadMemory = function() {
  const input = process.argv[2].split(' ');
  input.unshift(-1);

  for(let i = 1; i < input.length - 1; i++) {

    if(input[i].includes(':')) {
      const entry = input[i].split(':');
      labels[entry[0]] = i;
      input[i] = entry[1];
    }

    const number = +input[i];

    if(number + '' === 'NaN') {
      if(labels[input[i]] === undefined) {
        console.error(input[i], 'is not defined!');
        process.exit(1);
      }
      input[i] = labels[input[i]];
    }

    memory[i] = +input[i];
  };
};

const findLabels = function(input) {

};

const getValue = function(index) {
  if(memory[index] === undefined) {
    console.error(index, 'is not defined!');
    process.exit(1);
  }

  return memory[index];
};

const put = function(value, index) {
  memory[index] = value;
};

const assign = function(memory, index) {
  const value = getValue(index + 1); 
  const memLocation = getValue(index + 2); 
  put(value, memLocation);

  return index + 3;
};

const copy = function(memory, index) {
  const value = getValue(getValue(index+1)) ;
  put(value, getValue(index + 2));

  return index + 3;
};

const add = function(memory, index) {
  const firstValue = getValue(getValue(index+1)) ;
  const secondValue = getValue(getValue(index+2)) ;
  const memLocation = getValue(index + 3);
  put(firstValue + secondValue, memLocation); 

  return index + 4;
};

const sub = function(memory, index) {
  const firstValue = getValue(getValue(index+1)) ;
  const secondValue = getValue(getValue(index+2)) ;
  const memLocation = getValue(index + 3);
  put(firstValue - secondValue, memLocation); 

  return index + 4;
};

const jump = function(memory, index) {
  return getValue(index + 1);
};

const jumpIfLesser = function(memory, index) {
  const firstValue = getValue(getValue(index+1)) ;
  const secondValue = getValue(getValue(index+2)) ;

  if(firstValue < secondValue) {
    return getValue(index + 3);
  }

  return index + 4;
};

const halt = function() {
  console.log(memory);
  process.exit();
};

const operations = {
  '0': assign,
  '1': add, 
  '2': sub, 
  '3': jump, 
  '5': jumpIfLesser, 
  '7': copy, 
  '9': halt
};

const runCode = function() {
  let index = 1;
  while(index < Object.keys(memory).length) {
    const operation = operations[memory[index]];
    if(operation === undefined) {
      halt();
    }
    index = operation(memory, index);
  }
};

loadMemory();
runCode();
