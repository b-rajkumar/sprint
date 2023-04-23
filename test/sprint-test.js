const test = require('../lib/test-framework.js');
const sourceFunctions = require('../src/sprint.js');

test.assertEquality(1, sourceFunctions.one, '1 should be one');
test.assertEquality(2, sourceFunctions.one, '2 should not be one');
