// Mutable is object and array
let array = [1, 2, 3];
array.push(4); 

let object = { key: 'value' };
object.key = 'new value'; 

console.log(array);
console.log(object);

// Immutable
let immutableString = 'Hello';
// immutableString[1] = 'a'; //error
let newString = immutableString + ' World';

let immutableNumber = 42;
let newNumber = immutableNumber + 10;

console.log(immutableString);
console.log(newString)
console.log(newNumber);

// Use the spread operator to a new copy of copy array 
const originalArray = [1, 2, 3];
const copyArray = [...originalArray];

// Use the spread operator to create a new copy of the object
const originalObject = { a: 1, b: 2 };

// Object.assign copy properties from originalObject
const copyObject = Object.assign({}, originalObject); 

copyArray.push(4);
copyObject.c = 3;

console.log(originalArray);
console.log(copyArray); 

console.log(originalObject);
console.log(copyObject);


