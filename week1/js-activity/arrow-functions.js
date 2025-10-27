// Scenario 1: Basic Function: Refactor a simple function with no parameters and a single-line return statement
// Regular function
function sayHello() {
    return "Hello, world!";
}

// Refactor function
const sayHelloArrow = () => "Hello, world!";


// Scenario 2: Single Parameter: Refactor a function with a single parameter
// Regular function
function double(x) {
    return x * 2;
}

// Refactor function
const doubleArrow = (x) => x * 2;


// Scenario 3: Multiple Parameters: Refactor a function with multiple parameters
// Regular function
function add(x, y) {
    return x + y;
}

// Refactor function
const addArrow = (x, y) => x + y;


// Scenario 4: Function Inside an Object: Refactor a function defined inside an object
// Regular function
const person = {
    name: "Alice",
    sayHi: function () {
        return "Hi, " + this.name + "!";
    }
};

// Refactor function
const personArrow = {
    name: "Alice",
    sayHi: () => "Hi, " + this.name + "!"
};


// Scenario 5: Callback Functions
// Regular function
const numbers = [1, 2, 3, 4, 5];
const doubled = [];
numbers.forEach(function (num) {
    doubled.push(num * 2);
});

// Refactor function
numbers.forEach(num => doubled.push(num * 2));
