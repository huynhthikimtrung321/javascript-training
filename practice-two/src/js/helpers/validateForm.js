import { VALIDATION_ERRORS } from "../constants/messages";
import REGEX from "../constants/regex";

const {
  EMPTY_FIELD_ERROR,
  MIN_LENGTH_ERROR,
  IS_INVALID_SKU,
  IS_NAN_ERROR,
  IS_NOT_INTEGER_ERROR,
  IS_NEGETIVE_ERROR
} = VALIDATION_ERRORS;

const {
  validSKURegex
} = REGEX;

const isNotEmptyField = (value) => value !== '' ? '' : EMPTY_FIELD_ERROR;
const hasMinLength = (value, min = 5) => value.length >= min ? '' : MIN_LENGTH_ERROR;
const isValidSKU = (value) => validSKURegex.test(value) ? '' : IS_INVALID_SKU;
const isNumber = (value) => !isNaN(parseFloat(value)) && parseFloat(value).toString() === value ? '' : IS_NAN_ERROR;
const isInteger = (value) => Number.isInteger(parseFloat(value)) ? '' : IS_NOT_INTEGER_ERROR;
const isPositiveNumber = (value) => parseFloat(value) >= 0 ? '' : IS_NEGETIVE_ERROR;

const validateForm = (formFields) => {
  const formError = {};

  formFields.forEach(formField => {
    const {
      field,
      value,
      validators
    } = formField;

    for (const validator of validators) {
      if (formError[field] && formError[field] !== '') {
        break;
      }

      formError[field] = validator(value);
    }
  });

  return formError;
}

const renderErrorMessages = (element = document, formError) => {
  const errorMsgElements = element.querySelectorAll('.error-msg');

  errorMsgElements.forEach(elem => {
    const field = elem.dataset.fieldError;
    elem.textContent = formError[field];
  });
}

export {
  isNotEmptyField,
  hasMinLength,
  isValidSKU,
  isNumber,
  isInteger,
  isPositiveNumber,
  renderErrorMessages,
  validateForm
}
