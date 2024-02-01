// Declaration

let languages = ['PHP', 'JavaScript', 'C#', 'Ruby', 'Python'];
console.log(languages[0]);

//add the new one to the array
languages[3] = 'Java';

// How to add an item to an array
languages.push('C++');

// How to remove an item from an array
languages.shift();

// How to join two or more arrays

let framework = ['Wicket', 'Angular', 'Gulp'];
let arr = languages.concat(framework);

// How to cut part of an array into a new array

let cutLanguages = languages.slice(2);
console.log(cutLanguages);

//Access element of an array
console.log(`[${languages}][0] = ${languages[0]}`);
console.log(`[${languages}][1] = ${languages[1]}`);
console.log(`[${languages}][2] = ${languages[2]}`);

console.log(languages);
console.log(arr);
languages.forEach(function (language) {
  console.log(language);
});

// map()
let num = [10, 20, 30, 40];
let result = num.map(element => element + 10);

console.log(result);

// filter
let check = num.filter(element => element <25)
console.log(check);





