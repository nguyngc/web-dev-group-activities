// 1.
function cube(x) {
    return x * x * x;
}

const cube = function (x) {
    return x * x * x;
}


// 2.
function fullName(first, last) {
    return first + " " + last;
}

const fullName = function(first, last) {
    return first + " " + last;
}


// 3.
function power(base, exp) {
    if (exp === 0) {
        return 1;
    }
    return base * power(base, exp - 1);
}

const power = function(base, exp) {
    if (exp === 0) {
        return 1;
    }
    return base * power(base, exp - 1);
}


// 4.
function sumCubes(numbers) {
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
        total = total + cube(numbers[i]);
    }
    return total;
}

const sumCubes = function(numbers) {
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
        total = total + cube(numbers[i]);
    }
    return total;
}
