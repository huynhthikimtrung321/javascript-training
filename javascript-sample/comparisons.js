let x = 10;
let y = 5;

console.log(`${x} > ${y}`, x > y);
console.log(`${x} < ${y}`, x < y);
console.log(`${x} >= ${y}`, x >= y);
console.log(`${x} <= ${y}`, x <= y);
console.log(`${x} == ${y}`, x == y);
console.log(`${x} != ${y}`, x != y);

console.log('Apple > Banana', 'Apple' > 'Banana');
console.log('Banana < Coconut', 'Banana' < 'Coconut');
console.log('apple > Apple', 'apple' > 'Apple');

console.log('"10" > 5', '10' > 5); // '10' is converted to a number
console.log('"01" == 1', '01' == 1); // '01' is converted to a number

console.log('true == 1', true == 1); // true is converted to 1
console.log('false == 0', false == 0); // false is converted to 0

let a = 0;
let b = false;
console.log(`${a} == ${b}`, a == b);
console.log(`${a} === ${b}`, a === b);

console.log('null == undefined', null == undefined);
console.log('null === undefined', null === undefined);
