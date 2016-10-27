// Statistical Methods
// Luke Mitchell, April 2016
// https://github.com/lukem512/statistical-methods

// Extract a numeric value from an array
function num(elem) {
	var f = parseFloat(elem);
	if (f) return f;
	return 0;
};

// Sort a numeric array
function sort(arr) {
	return arr.sort(function(a, b) {
		var x = num(a), y = num(b);
		return x - y;
	});
};

// Return the minimum value in a numeric array
var min = module.exports.min = function(arr) {
	if (arr.length == 0) return null;

	var min = Infinity;
	for (var i = 0; i < arr.length; i++) {
		var elem = num(arr[i]);
		if (elem < min) min = elem;
	}

	return min;
};

// Return the maximum value in a numeric array
var max = module.exports.max = function(arr) {
	if (arr.length == 0) return null;

	var max = -Infinity;
	for (var i = 0; i < arr.length; i++) {
		var elem = num(arr[i]);
		if (elem > max) max = elem;
	}

	return max;
};

// Compute the mean of a numeric array
var mean = module.exports.mean = function(arr) {
	if (arr.length == 0) return null;

	return mu = sum(arr) / arr.length;
};

// Compute the mode (most frequent value) of a numeric array
// https://stackoverflow.com/posts/3451640
var mode = module.exports.mode = function(arr) {
	if (arr.length == 0) return null;

	var sorted = sort(arr),
    	modeMap = {},
        maxCount = 2,
        modes = [];

    for(var i = 0; i < sorted.length; i++)
    {
        var el = sorted[i];

        if (!modeMap[el]) modeMap[el] = 1;
        else modeMap[el]++;

        if (modeMap[el] > maxCount)
        {
            modes = [el];
            maxCount = modeMap[el];
        }
        else if (modeMap[el] == maxCount)
        {
            modes.push(el);
            maxCount = modeMap[el];
        }
    }

    if (modes.length == 1) return modes[0];
    else if (modes.length == 0) return null;
    else return modes;
};

// Compute the median of a numeric array
var median = module.exports.median = function(arr) {
	if (arr.length == 0)
        return null;

	var sorted = sort(arr);
	var mid = Math.floor(sorted.length / 2);

	// Odd numbers
	if (sorted.length % 2 == 1) {
		return num(sorted[mid]);
	}

	// Even numbers
	var top = num(sorted[mid]),
		bot = num(sorted[mid-1]);
	return (top + bot) / 2.0;
};

// Compute the range of a numeric array
var range = module.exports.range = function(arr) {
	if (arr.length == 0) return null;

	var min = Infinity, max = -Infinity;
	for (var i = 0; i < arr.length; i++) {
		var elem = num(arr[i]);
		if (elem < min) min = elem;
		if (elem > max) max = elem;
	}

	return max - min;
};

// Compute the variance of a numeric array
// This defaults to the sample variance
var variance = module.exports.variance = function(arr, sample) {
	if (arr.length == 0) return null;

	if (!sample) sample = true;
	var mu = mean(arr);
	var divisor = (sample ? arr.length - 1 : arr.length);

	return (1/divisor) * sum(arr.map(function(i) {
		return (i - mu) * (i - mu);
	}));
};

// Compute the standard deviation of a numeric array
var stddev = module.exports.stddev = function(arr, sample) {
	if (arr.length == 0) return null;
	var s2 = variance(arr, sample);
	return Math.sqrt(s2);
};

// Sum all numeric elements in an array
var sum = module.exports.sum = function(arr) {
	if (arr.length == 0) return null;

	var total = 0;
	for (var i = 0; i < arr.length; i++) {
		total += num(arr[i]);
	}

	return total;
};

// Find the product of all numeric elements in an array
var prod = module.exports.prod = function(arr) {
	if (arr.length == 0) return null;

	var total = 1;
	for (var i = 0; i < arr.length; i++) {
		total *= num(arr[i]);
	}

	return total;
};
