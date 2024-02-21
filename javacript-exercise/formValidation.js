function comparePasswords() {
  const passwordElement = document.getElementById("password");
  const passwordConfirmElement = document.getElementById(
    "password-confirmation"
  );
  const errorMessage2 = document.querySelector(
    '.form-message[data-attribute="password-confirmation"]'
  );

  if (passwordElement.value !== passwordConfirmElement.value) {
    errorMessage2.textContent = "passwords do not match!";

    return false;
  } else {
    errorMessage2.textContent = "";
  }

  return true;
}

function displayErrorMessage(field, msg) {
  const errorMessage = document.querySelector(
    `.form-message[data-attribute='${field}']`
  );
  errorMessage.textContent = msg;
}

function checkEmpty(isEmpty) {
  const inputElement = document.getElementById(isEmpty);
  if (inputElement.value === "") {
    displayErrorMessage(isEmpty, "Please enter this field");

    return false;
  } else {
    displayErrorMessage(isEmpty, "");
  }

  return true;
}

function checkEmail() {
  const emailInputElement = document.getElementById("email");
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/;

  if (!emailPattern.test(emailInputElement.value)) {
    displayErrorMessage("email", "Email invalid");

    return false;
  } else {
    displayErrorMessage("email", "");
  }

  return true;
}

function checkBox() {
  const checkGenderElement1 = document.getElementById("gender-male");
  const checkGenderElement2 = document.getElementById("gender-female");

  if (!checkGenderElement1.checked && !checkGenderElement2.checked) {
    displayErrorMessage("checkbox", "Please choose gender");

    return false;
  } else {
    displayErrorMessage("checkbox", "");
  }

  return true;
}

function checkSelector() {
  const checkSelectorElement = document.getElementById("country");

  if (checkSelectorElement.value === "") {
    displayErrorMessage("country", "Please choose country");

    return false;
  } else {
    displayErrorMessage("country", "");
  }

  return true;
}

let formError = {};

function validateForm() {
  formError = {};

  if (!checkEmpty("fullname")) {
    formError.fullname = "Name is required";
  }

  if (!checkEmail()) {
    formError.email = "Invalid email";
  }

  if (!checkEmpty("password")) {
    formError.password = "Password is required";
  }

  if (!checkEmpty("password-confirmation")) {
    formError["password-confirmation"] = "Password confirmation is required";
  }

  if (!comparePasswords()) {
    formError.comparePasswords = "Not the same";
  }

  if (!checkBox()) {
    formError.checkBox = "Gender is required";
  }

  if (!checkSelector()) {
    formError.checkSelector = "Country is required";
  }

  console.log(formError);

  return Object.keys(formError).length === 0;
}

const formElement = document.querySelector(".form");
formElement.addEventListener("submit", (e) => {
  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const country = document.getElementById("country").value;
  const gender = document.getElementById("gender-male").checked;

  if (!validateForm()) return e.preventDefault();

  const confirmationMessage = `
    Fullname: ${fullname}
    Email: ${email}
    Password: ${password}
    Gender: ${gender ? "Male" : "Female"}
    Country: ${country}
  `;

  const isConfirmed = window.confirm(confirmationMessage);

  if (!isConfirmed) {
    e.preventDefault();
  }
});
