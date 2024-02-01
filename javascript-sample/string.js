// Quotes

let single = 'Hello';
let double = "Hi!";
let backtick = `Bye`;

let a = 2;
let b = 10;

console.log(single);
console.log(double);
console.log(backtick);
console.log(`${a} + ${b} = `, a + b);

// Special characters

let str1 = `Hello
Trung`;
let str2 = 'Hello\nTrung';
console.log(str1 === str2);

// String length
console.log(str2.length);

// Accessing characters
console.log(str1[2]);

// Change is case
console.log(str1.toUpperCase());
console.log(str2[0].toLowerCase());

// Searching substring
console.log(`"${str1}".indexOf("o") = ${str1.indexOf('o')}`);
console.log(`"${str1}".includes("Trung") = ${str1.includes('Trung')}`);

