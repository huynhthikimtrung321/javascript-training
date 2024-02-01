let a = 10;
let b = 2;
let c = 100;

// Addition 
let sum = a+b;

// Subtraction 
let signal = b-a;

// Multiplication
let product = a*b;

// Division
let equal = a/b;

// Modulus
let remainder = a%b;

// Exponentiation
let power =a**b;

// Assignment Operators
let assignmentResult = 4 + (a = b + 2);

// Unary operators
--c;

console.log(`${a} + ${b} =` , sum);
console.log(`${b} - ${a} =` , signal);
console.log(`${a} * ${b} =` , product);
console.log(`${a} / ${b} =` , equal);
console.log(`${a} % ${b} =` , remainder);
console.log(`${a} ** ${b} =` , power);
console.log(`4 + (a = ${b} + 2) =` , assignmentResult);
console.log(`--${++c} =`, c);
