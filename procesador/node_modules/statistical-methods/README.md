# statistical-methods

[![Build Status](https://travis-ci.org/lukem512/statistical-methods.svg?branch=master)](https://travis-ci.org/lukem512/statistical-methods) ![Build Status](https://david-dm.org/lukem512/statistical-methods.svg) [![npm](https://img.shields.io/npm/l/statistical-methods.svg)](https://www.npmjs.com/package/statistical-methods) [![npm](https://img.shields.io/npm/v/statistical-methods.svg)](https://www.npmjs.com/package/statistical-methods) [![npm](https://img.shields.io/npm/dm/statistical-methods.svg)](https://www.npmjs.com/package/statistical-methods)

This is an NPM module providing a collection of statistical methods including mean, mode, median, range, variance, standard deviation, sum and product.

To use it, simple install via NPM and include it in your project file.

```
	var sm = require('statistical-methods');
```

Then, use the following functions to perform statistical analysis on your data.

```
	var arr = [ 8, 9, 10, 10, 10, 11, 11, 11, 12, 13];

	console.log(sm.mean(arr));     // 10.5
	console.log(sm.median(arr));   // 10.5
	console.log(sm.mode(arr));     // [10, 11]

	console.log(sm.min(arr));	   // 8
	console.log(sm.max(arr));	   // 13
	console.log(sm.range(arr));    // 5

	console.log(sm.variance(arr)); // 2.0555555555555554,
	console.log(sm.stddev(arr));   // 1.4337208778404378,

	console.log(sm.sum(arr));	   // 105
	console.log(sm.prod(arr));	   // 14949792000
```

The expected data format for all functions is an array of numbers (integers or floats).