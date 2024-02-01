// Function declaration
function showMessage(msg) {
  console.log(msg);
}
showMessage("Hello World!");

// Outer variable
let outerVariable = "I am an outer variable";

function localVariable() {
  // Local variable
  let localVariable = "I am a local variable";

  console.log(localVariable);
  console.log(outerVariable);
}

localVariable();

// Function expression
const myShowMessage = function (msg) {
  console.log(msg);
};

// Default parameter it is not provided
function showMessage2(msg = "Default message.") {
  console.log(msg);
}
showMessage2();

// Lexical scoping
function showVariable() {
  console.log(variable);
}
const variable = "This is variable! And it can be accessed by the function.";
showVariable();

// Function Hoisting
showMessage3();
function showMessage3(msg = "Default message.") {
  console.log(msg);
}

// Function with parameters
function showMessage4(fullName) {
  console.log(`My full name is: ${fullName}`);
}
showMessage4("Trung Huynh");

// Function returns a value
function getSecretMessage(key) {
  if (key !== "secret") return;

  return "This is a secret message!";
}
const secretMessage = getSecretMessage("secret");
console.log(secretMessage);
