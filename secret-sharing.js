const fs = require('fs');

// Function to decode a number from a given base
function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}

// Function to calculate Lagrange interpolation
function lagrangeInterpolation(points) {
    let secret = 0;
    const n = points.length;

    for (let i = 0; i < n; i++) {
        let xi = points[i][0];
        let yi = points[i][1];
        let li = 1;

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                li *= (0 - points[j][0]) / (xi - points[j][0]);
            }
        }
        secret += li * yi;
    }
    return Math.round(secret);
}

// Main function to process JSON input and calculate secret
function findSecret(jsonFilePath) {
    const data = JSON.parse(fs.readFileSync(jsonFilePath));
    const n = data.keys.n;
    const k = data.keys.k;

    // Collect points (x, y)
    const points = [];
    for (let i = 1; i <= n; i++) {
        const key = i.toString();
        if (data[key]) {
            const base = data[key].base;
            const value = data[key].value;
            const x = i; // x is simply the key number
            const y = decodeValue(base, value);
            points.push([x, y]);
        }
    }

    // Calculate the secret using Lagrange interpolation
    const secret = lagrangeInterpolation(points.slice(0, k)); // Use only k points
    console.log(`The secret constant term c is: ${secret}`);
}

// Call the function with the path to your JSON file
findSecret('./testcase.json'); // Ensure this path points to your JSON file