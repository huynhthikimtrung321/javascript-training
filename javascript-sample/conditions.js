let score = 8.5;

if (score <=4 ) {
    console.log('Type F');
} else if (score <= 5.4) {
    console.log('Type D');
} else if (score <= 6.9) {
    console.log('Type C');
} else if (score <= 8.4){
    console.log('Type B');
} else {
    console.log('Type A');
}

let a = 5;
let b = 6;

if (a == 5) {
  a = 6;
}

let isAdult = true;
let msg = isAdult ? 'Hello adult!' : 'Hello kid!';
console.log(msg);

let age = 15;
let personType = (age < 13) ? 'child' : ((age < 20) ? 'teenager' : 'adult');
console.log(personType);