const style = require('./style-utils.js');

let totalTests = 0;
let passedTests = 0;
const testLog = [];

const incrementTotalTests = function() {
  totalTests += 1;
};

const incrementPassedTests = function() {
  passedTests += 1;
};

const getTotalTests = function() {
  return totalTests;
};

const getPassedTests = function() {
  return passedTests;
};

const getLog = function() {
  return testLog;
};

const incrementTests = function(result, expected, actual, func, message) {
  incrementTotalTests();
  if(result) {
    incrementPassedTests();
  }
  testLog.push({result, expected, actual, func, message});
};

const displayTitle = function(text) {
  let title = style.bold(style.yellow("\n" + text));
  title += "\n" + "-".repeat(text.length);
  console.log(title);
};

const displayResult = function(result, expected, actual, func, message) {
  const icon = result ? '✅\t' : '❌\t';
  console.log(icon + message);
  if(result === false) {
    console.log("\t", "Expected =", expected); 
    console.log("\t", "actual =", actual); 
  }
};

const assertEquality = function(expected, actual, func, message) {
  const result = expected === actual;

  if(message !== undefined) {
    incrementTests(result, expected, actual, func, message);
  }

  return result;
};

const assertAlmostEqual = function(expected, actual, func, message) {
  const result = Math.abs(expected - actual) < 0.2;

  if(message !== undefined) {
    incrementTests(result, expected, actual, func, message);
  }

  return result;
};

const assertListsEqual = function(expected, actual, func, message) {
  let result = areListsEqual(expected, actual);

  if(message !== undefined) {
    incrementTests(result, expected, actual, func, message);
  }

  return result;
};

const areListsEqual = function(firstList, secondList) {
  if(firstList.length !== secondList.length) {
    return false;
  }

  return firstList.every(function(element, index){
    return areEquals(element, secondList[index])
  });
};

const assertObjectsEqual = function(expected, actual, func, message) {
  let result = Object.keys(expected).length === Object.keys(actual).length;

  if(result) {
    for(const key in expected) {
      if(!areEquals(expected[key], actual[key])) {
        result = false;
      }
    }
  }

  if(message !== undefined) {
    incrementTests(result, expected, actual, func, message);
  }
  return result;
};

const toPrettyString = function(object) {
  if(typeof(object) !== 'object' || Array.isArray(object) === true) {
    return object + '';
  }
  let objectString = '{';

  for(const key in object) {
    let value = object[key];
    if(typeof(value) === 'object'){
      value = toPrettyString(value);
    };
    objectString += key + ': ' + value + ', ';
  }
  objectString += '}';

  return objectString;
};

const areEquals = function(expected, actual) {
  if(Array.isArray(expected) && Array.isArray(actual)) {
    return assertListsEqual(expected, actual);
  }
  if(typeof(expected) === 'object' && typeof(actual) === 'object') {
    return assertObjectsEqual(expected, actual);
  }
  return expected === actual;
};

const assertEquals = function(expected, actual, func, message) {
  const result =  areEquals(expected, actual);
  if(message !== undefined) {
    incrementTests(result, expected, actual, func, message);
  }
};

const formatSummary = function() {
  let summary = "\n";
  summary += "  Summary: ";
  summary += getPassedTests() + " / " + getTotalTests();
  summary += " passed";
  return summary;
};

const displaySummary = function() {
  const testsByFn = groupByFunctions();
  const testedFunctions = Object.keys(testsByFn);

  for(const fn of testedFunctions) {
    const tests = testsByFn[fn]
    const passedTests = tests[0]; 
    const totalTests = tests[1]; 

    displayTitle(fn + '() ' + passedTests + ' / ' + totalTests + ' Passed'); 
    tests.slice(2).forEach(function(test){
      displayResult(test.result, test.expected, test.actual, test.func, test.message);
    });
  }
  console.log(style.bold(style.white(formatSummary())));
};

const groupByFunctions = function() {
  return testLog.reduce(function(groupedLog, test) {
    if(groupedLog[test.func] === undefined) {
      groupedLog[test.func] = [];
      groupedLog[test.func].push(0, 0);
    }
    groupedLog[test.func][1] += 1;
    if(test.result === true) {
      groupedLog[test.func][0] += 1;
    };
    groupedLog[test.func].push(test);
    return groupedLog;
  }, {});
};

exports.assertEquality = assertEquality;
exports.assertAlmostEqual = assertAlmostEqual;
exports.assertListsEqual = assertListsEqual;
exports.displayTitle = displayTitle;
exports.displaySummary = displaySummary;
exports.getLog = getLog;
exports.assertObjectsEqual = assertObjectsEqual;
exports.assertEquals = assertEquals;
