const square = (number) => {
  return number * number;
};

console.log(square(5));
const numbers = [1, 2, 3, 4, 5];

const squaredNumbers = numbers.map(number => number * number);

console.log(squaredNumbers);

// arrow functions do not have their own this
const user = {
    userMethod() {
      console.log('this:', this); // 'this' refers to 'user' the one calls it
  
      const myArrowFunction = () => {
        console.log('this:', this); // 'this' still refers to 'user' but it is inherited from the parent scope
      };
      myArrowFunction();
    }
  };
  
  user.userMethod();