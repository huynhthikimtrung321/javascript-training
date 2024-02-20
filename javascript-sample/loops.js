// While loop
let countDown = 5;
let counter = 0;

while (countDown > 0) {
  console.log('counter: ', + countDown);
  countDown--;
}
console.log("Happy New Year!");

// do...while loop
let i = 0;
do {
  i++;
} while (i < 3);

console.log(i);

// for loop
let msg = ``;
for (let counter = 0; counter < 5; ++counter) {
  msg += `counter: ${counter}, `;
}
console.log(msg);

// using continue to skip an iteration in a loop, and break to exit a loop
let text = "\n";
for (let i = 0; i < 10; i++) {
  if (i === 3) { 
    break; 
  }
  text += i;
	text += "\n";
}

console.log('The number is: ' + text);

// for of loop
const list = ['a', 'b', 'c']
for (const value of list) {
console.log(value)
}

// Label with nested loop
outer:
for (let x = 0; x < 5; x++) {
  for (let y = 0; y < 5; y++) {
    if (y === 2) {
      break outer;
    }

    console.log(`x: ${x}, y: ${y}`);
  }
}