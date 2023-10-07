const upperCase = require('upper-case').upperCase

function greet(name) {
    console.log(upperCase(`Hello ${name}, welcome to Our Organization`));
}

greet("Vivek Kumar");

module.exports =  greet;