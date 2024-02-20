let dog = {
  name: "KiKi",
  age: 2,
};
let pet = "name";
console.log("Name: " + dog[pet]);

// add new property
dog.color = "back";

// delete property
delete dog.age;
console.log(dog);

// Array of objects representing people
const people = [
  { name: "Alice", age: 25, lastName: "William" },
  { name: "Bob", age: 30, lastName: "Oscar" },
  { name: "Charlie", age: 22, lastName: "James" },
  { name: "David", age: 35, lastName: "Harry" },
];

// Use the filter() method to filter the array based on the condition
const check = (person) => person.age >= 25;
const resultPeople = people.filter(check);

resultPeople.forEach((person) => {
  console.log(`${person.name} is ${person.age} years old.`);
});

// key word this 
function printFullName() {
  let fullName = this.name + " " + this.lastName;
  console.log(fullName);
}
for (const person of people) {
  printFullName.call(person);
}
