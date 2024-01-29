// Declaration

let languages = ['PHP', 'JavaScript', 'C#'];
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

//Access element of an array
console.log(`[${languages}][0] = ${languages[0]}`);
console.log(`[${languages}][1] = ${languages[1]}`);
console.log(`[${languages}][2] = ${languages[2]}`);

console.log(languages);
console.log(arr);


