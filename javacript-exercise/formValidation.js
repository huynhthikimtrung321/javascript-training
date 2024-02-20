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
    const errorMessage = document.querySelector(
        '.form-message[data-attribute="email"]'
      );
    errorMessage.textContent = "email khong hop le";
    
    return false;
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

const formElement = document.querySelector(".form");
formElement.addEventListener("submit", (e) => {
  let isValid = true;

  isValid = checkEmpty('fullname');
  isValid = checkEmail();
  isValid = checkEmpty('password');
  isValid = checkEmpty('password-confirmation');
  isValid = comparePasswords();
  isValid = checkBox();
  console.log(isValid)
  if(isValid === false) {
    return e.preventDefault();
  }
});