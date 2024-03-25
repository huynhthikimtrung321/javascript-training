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
const isNumber = (value) => (typeof value === 'number' && !isNaN(value)) ? '' : IS_NAN_ERROR;
const isInteger = (value) => Number.isInteger(value) ? '' : IS_NOT_INTEGER_ERROR;
const isPositiveNumber = (value) => value >= 0 ? '' : IS_NEGETIVE_ERROR;

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

export {
  isNotEmptyField,
  hasMinLength,
  isValidSKU,
  isNumber,
  isInteger,
  isPositiveNumber,
  validateForm
}
