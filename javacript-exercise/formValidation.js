function comparePasswords() {
  const passwordElement = document.getElementById('password');
  const passwordConfirmElement = document.getElementById('password-confirmation');
  const errorMessage2 = document.querySelector(
    '.form-message[data-attribute="password-confirmation"]'
  );

  if(passwordElement.value !== passwordConfirmElement.value) {
    errorMessage2.textContent = "mat khau khong trung nhau!";

    return false;

  } else {
    errorMessage2.textContent = '';
  }

  return true;
}

function displayErrorMessage(field, msg) {
  const errorMessage = document.querySelector(
    `.form-message[data-attribute="${field}"]`
  );
  errorMessage.textContent = msg;
}

function checkEmpty(fieldName) {
  const inputElement = document.getElementById(fieldName);
  if (inputElement.value === "") {
    displayErrorMessage(fieldName, "nhap thieu roi hyhy");

    return false;
  } else {
    displayErrorMessage(fieldName, "");
  }

  return true;
}

function checkEmail() {
  const emailInputElement = document.getElementById("email");
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/;

  if (!emailPattern.test(emailInputElement.value)) {
    displayErrorMessage('email', 'Email khong hop le');
    
    return false;
  } else {
    displayErrorMessage('email', '');
  }

  return true;
}

function checkBox() {
  const check1Element = document.getElementById('check1');
  const check2Element = document.getElementById('check2');

  if (!check1Element.checked && !check2Element.checked) {
    displayErrorMessage('checkbox', 'Vui long check');

    return false;
  } else {
    displayErrorMessage('checkbox', '');
  }

  return true;
}

function checkSelector() {
  const checkSelectorElement = document.getElementById('country');

  if (checkSelectorElement.value === ''){
    displayErrorMessage('country', 'Vui long chon quoc gia');

    return false;
  } else {
    displayErrorMessage('country', '');
  }

  return true;
}

const formElement = document.querySelector(".form");
formElement.addEventListener("submit", (e) => {
  const checkings = [];
  
  checkings.push(checkEmpty('fullname'));
  checkings.push(checkEmail());
  checkings.push(checkEmpty('password'));
  checkings.push(checkEmpty('password-confirmation'));
  checkings.push(comparePasswords());
  checkings.push(checkBox());
  checkings.push(checkSelector());
  console.log(checkings);
  
  const fullname = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const country = document.getElementById('country').value;
  const gender = document.getElementById('check1').checked;

  const isInvalid = checkings.some(condition => !condition);
  if(isInvalid) return e.preventDefault();

  const confirmationMessage = `
    Fullname: ${fullname}
    Email: ${email}
    Password: ${password}
    Gender: ${gender ? 'Male' : 'Female'}
    Country: ${country}
  `;

  const isConfirmed = window.confirm(confirmationMessage);

  if (!isConfirmed) {
    e.preventDefault();
  }
});