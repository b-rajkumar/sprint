const style = require('./style-utils.js');

let totalTests = 0;
let passedTests = 0;
const testLog = [];

const incrementTotalTests = function(){
  totalTests += 1;
};

const incrementPassedTests = function(){
  passedTests += 1;
};

const getTotalTests = function(){
  return totalTests;
};

const getPassedTests = function(){
  return passedTests;
};

const createLog = function(result, expected, actual, message){
  const icon = result === true ?  '✅' : '❌';
  const testResult = {icon, expected, actual, message};

  return testResult;
};

const expectationMismatch = function(expected, actual){
  let message = "\n";
  message += "\tExpected = " + expected;
  message += "\n";
  message += "\t  Actual = " + actual;

  return message;
};

const formatTestMessage = function(result, expected, actual, message){
  const icon = (result === true)?  '✅ ' : '❌ ';
  let formattedMessage = message;

  if(result === false){
    formattedMessage += expectationMismatch(expected, actual);
  }

  return icon + formattedMessage;
};

const assertEquality = function(expected, actual, message){
  const result = expected === actual;

  console.log(formatTestMessage(result, expected, actual, message));
  incrementTotalTests();
  if(result)incrementPassedTests();
  testLog.push(createLog(result, expected, actual, message));

  return result;
};

const assertAlmostEqual = function(expected, actual, message){
  const result = Math.abs(expected - actual) < 0.2;

  console.log(formatTestMessage(result, expected, actual, message));
  incrementTotalTests();
  if(result)incrementPassedTests();
  testLog.push(createLog(result, expected, actual, message));

  return result;
};

const assertListsEqual = function(firstList, secondList, message){
  let result = false;

  if(firstList.length === secondList.length){
    result = true;
    for(let currentIndex = 0; currentIndex < firstList.length; currentIndex++){
      if(firstList[currentIndex] !== secondList[currentIndex])result = false;
    }
  }
  console.log(formatTestMessage(result, firstList, secondList, message));
  incrementTotalTests();
  if(result)incrementPassedTests();
  testLog.push(createLog(result, firstList, secondList, message));

  return result;
};

const assertObjectsEqual = function(expected, actual, message){
  let result = Object.keys(expected).length === Object.keys(actual).length;

  if(result){
    for(const key in expected){
      if(expected[key] !== actual[key])result = false;
    }
  }
  incrementTotalTests();
  if(result)incrementPassedTests();
  const icon = (result === true)?  '✅ ' : '❌ ';

  console.log(icon, message);
  if(result === false){
    console.log("\t", "Expected = ", expected); 
    console.log("\t", "actual = ", actual); 
  }
  testLog.push(createLog(result, expected, actual,  message));
  return result;
};

const displayTitle = function(text){
  console.log(style.bold(style.yellow("\n"+text)));
  console.log("-".repeat(text.length));
};

const displaySummary = function(){
  let summary = "\n";
  summary += "  Summary: ";
  summary += getPassedTests()+ " / " + getTotalTests();
  summary += " passed";
  console.log(style.bold(style.white(summary)));
};

const displayLogTable = function(){
  console.table(testLog);
};

const displayLog = function(){
  console.log(testLog);
};

exports.assertEquality = assertEquality;
exports.assertAlmostEqual = assertAlmostEqual;
exports.assertListsEqual = assertListsEqual;
exports.displayTitle = displayTitle;
exports.displaySummary = displaySummary;
exports.displayLog = displayLog;
exports.displayLogTable = displayLogTable;
exports.assertObjectsEqual = assertObjectsEqual;
