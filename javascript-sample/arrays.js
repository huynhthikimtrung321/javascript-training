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

console.log(languages);
console.log(arr);


