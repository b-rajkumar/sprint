const programMemory = process.argv[2].split(' ');
const memory = {};

for(let i = 0; i < programMemory.length; i++) {
  let key = i + 1;
  let num = +programMemory[i];
  if(programMemory[i].includes(':')){
    let value = programMemory[i].split(':');
    memory[[value[0]]] = key;
    num = +value[1];
  };
  memory[key] = num;
};

const assign = function(memory, index) {
  const value = memory[index + 2] ;
  const memLocation = memory[index + 3];
  memory[memLocation] = value;
  return index + 3;
};

const add = function(memory, index) {
  const firstValue = memory[memory[index + 2]];
  const secondValue = memory[memory[index + 3]];
  const memLocation = memory[index + 4];
  memory[memLocation] = firstValue + secondValue;
  return index + 4;
};

const sub = function(memory, index) {
  const firstValue = memory[memory[index + 2]];
  const secondValue = memory[memory[index + 3]];
  const memLocation = memory[index + 4];
  memory[memLocation] = firstValue - secondValue;
  return index + 4;
};

const jump = function(memory, index) {
  return memory[index + 1];
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
  '9': halt
};

const keys = Object.keys(memory);
for(let i = 0; i < keys.length;) {
  const operation = operations[memory[keys[i]]];
  i = operation(memory, i);
};

