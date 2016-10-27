// Statistical Methods
// Luke Mitchell, April 2016
// https://github.com/lukem512/statistical-methods

var sm = require('../src/statistical-methods');

var tests = [
	{
		name: 'Test #1',
		arr: [13, 18, 13, 14, 13, 16, 14, 21, 13],
		expected: {
			min: 13,
			max: 21,
			range: 8,
			mean: 15,
			median: 14,
			mode: 13,
			variance: 8,
			stddev: 2.8284271247461903,
			sum: 135,
			prod: 33856437888
		}
	},

	{
		name: 'Test #2',
		arr: [1, 2, 4, 7],
		expected: {
			min: 1,
			max: 7,
			range: 6,
			mean: 3.5,
			median: 3,
			mode: null,
			variance: 7,
			stddev: 2.6457513110645907,
			sum: 14,
			prod: 56
		}
	},

	{
		name: 'Test #3',
		arr: [ 8, 9, 10, 10, 10, 11, 11, 11, 12, 13],
		expected: {
			min: 8,
			max: 13,
			range: 5,
			mean: 10.5,
			median: 10.5,
			mode: [10, 11],
			variance: 2.0555555555555554,
			stddev: 1.4337208778404378,
			sum: 105,
			prod: 14949792000
		}
	},

	{
		name: 'Empty array test',
		arr: [],
		expected: {
			min: null,
			max: null,
			range: null,
			mean: null,
			median: null,
			mode: null
		}
	}
];


var returnCode = 0;

tests.forEach(function(t) {
	Object.keys(t.expected).forEach(function(o) {
		try {
			var value = sm[o](t.arr);
			if (Array.isArray(value)) {
				for (var i = 0; i < value.length; i++) {
					if (value[i] !== t.expected[o][i]) throw Error();
				};
			}
			else if (value !== t.expected[o])
				throw Error('Unexpected result for ' + o + 
					' (expected ' + JSON.stringify(t.expected[o]) + 
					' and got ' + JSON.stringify(value) + ')');
		}
		catch (err) {
			console.error(t.name, err);
			returnCode = 1;
		}
	});
});

process.exit(returnCode);