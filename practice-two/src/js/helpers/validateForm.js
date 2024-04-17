import { VALIDATION_ERRORS } from '../constants/messages';
import REGEX from '../constants/regex';

const {
  IS_EMPTY_FIELD,
  UNALLOWED_STRING_ERROR,
  INVALID_SKU_ERROR,
  NOT_NUMBER_ERROR,
  NOT_INTEGER_ERROR,
  NOT_POSITIVE_ERROR,
  getNotEnoughCharacterError,
  getNotGreaterError,
  getNotLesserError,
} = VALIDATION_ERRORS;

const { validSKURegex, allowedStringRegex } = REGEX;
const isNotEmptyField = value => (value !== '' ? '' : IS_EMPTY_FIELD);
const isAllowedString = value =>
  allowedStringRegex.test(value) ? '' : UNALLOWED_STRING_ERROR;
const hasMinLength = (value, min = 5) =>
  value.length >= min ? '' : getNotEnoughCharacterError(min);
const isGreaterOrEqual = (value, target) =>
  parseFloat(value) >= parseFloat(target.value)
    ? ''
    : getNotGreaterError(target.field);
const isLesserOrEqual = (value, target) =>
  parseFloat(value) <= parseFloat(target.value)
    ? ''
    : getNotLesserError(target.field);
const isValidSKU = value =>
  validSKURegex.test(value) ? '' : INVALID_SKU_ERROR;

  const isNumber = value =>
  !isNaN(parseFloat(value)) && parseFloat(value).toString() === value
    ? ''
    : NOT_NUMBER_ERROR;
const isInteger = value =>
  Number.isInteger(parseFloat(value)) ? '' : NOT_INTEGER_ERROR;
const isPositiveNumber = value =>
  parseFloat(value) >= 0 ? '' : NOT_POSITIVE_ERROR;

const validateForm = formFields => {
  const formError = {};

  formFields.forEach(formField => {
    const { field, value, validators } = formField;
    for (const validator of validators) {
      if (formError[field] && formError[field] !== '') {
        break;
      }
      formError[field] = validator(value);
    }
  });

  return formError;
};

const renderErrorMessages = (element = document, formError) => {
  const errorMsgElements = element.querySelectorAll('.error-msg');

  errorMsgElements.forEach(element => {
    const field = element.dataset.fieldError;
    element.textContent = formError[field];
  });
};

export {
  isNotEmptyField,
  isAllowedString,
  isGreaterOrEqual,
  isLesserOrEqual,
  hasMinLength,
  isValidSKU,
  isNumber,
  isInteger,
  isPositiveNumber,
  renderErrorMessages,
  validateForm,
};
