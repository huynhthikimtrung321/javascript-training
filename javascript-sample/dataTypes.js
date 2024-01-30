// Mutable is object and array
let array = [1, 2, 3];
array.push(4); 

let object = { key: 'value' };
object.key = 'new value'; 

console.log(array);
console.log(object);

// Immutable
let immutableString = 'Hello';
immutableString[1] = 'a'; //error
let newString = immutableString + ' World';

let immutableNumber = 42;
let newNumber = immutableNumber + 10;

console.log(immutableString);
console.log(newString)
console.log(newNumber);