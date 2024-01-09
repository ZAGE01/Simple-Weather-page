// I use export functions in order to import them to script.js...

// Calculating mean
export function calculateMean(values) {
    // Adding all the values together
    const sum = values.reduce((acc, val) => acc + val, 0);
    // Dividing by total amount of values
    return sum / values.length;
}

// Calculating median
export function calculateMedian(values) {
    // Sorting the array
    const sorted = values.sort((a, b) => a - b);
    // Middle of the array
    const middle = Math.floor(sorted.length / 2);

    // Testing whether the array.length is even or odd
    if (sorted.length % 2 == 0) {
        // If the array is even, I have to calculate the average or two middle numbers
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    else {
        return sorted[middle];
    }
}

// Calculating mode
export function calculateMode(values) {
    const frequencyCounter = {};
    // Counting the frequency of different values
    values.forEach((value) => {
        if (!frequencyCounter[value]) {
            frequencyCounter[value] = 1;
        }
        else {
            frequencyCounter[value]++;
        }
    });

    let modeValue = values[0];
    let modeCount = 1;

    // Counting what value is the most frequent
    for (const value in frequencyCounter) {
        if (frequencyCounter[value] > modeCount) {
            modeValue = value;
            modeCount = frequencyCounter[value];
        }
    }

    return modeValue;
}

// Calculating range
export function calculateRange(values) {
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    // Calculating difference between max and min values
    return maxValue - minValue;
}

// Calculating standard deviation
export function calculateSd(values) {
    // Calculating average with previous function
    const avg = calculateMean(values);
    // Calculating variance
    const variance = values.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / values.length;

    // Returning square root of variance
    return Math.sqrt(variance);
}