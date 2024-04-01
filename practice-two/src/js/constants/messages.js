const ALERT_MESSAGES = {
  ADD_SUCCESS_MSG: 'Product added successfully',
  ADD_FAILED_MSG: 'Adding failed products',
  EDIT_SUCCESS_MSG: 'Product edited successfully',
  EDIT_FAILED_MSG: 'Editing failed products',
  DELETE_SUCCESS_MSG: 'Product deleted successfully',
  DELETE_FAILED_MSG: 'Delete failed products',
};

const VALIDATION_ERRORS = {
  EMPTY_FIELD_ERROR: 'This field cannot be empty!',
  IS_NOT_GREATER_OR_EQUAL: (target) =>
    `this field should have value \u2265 ${target}'s value!`,
  IS_NOT_LESSER_OR_EQUAL: (target) =>
    `this field should have value \u2264 ${target}'s value!`,
  IS_INVALID_SKU:
    'This SKU is invalid, please only enter 2 aplhabetic characters',
  IS_NAN_ERROR: 'This field should only contain number',
  IS_NOT_INTEGER_ERROR: 'This field should only contain integer',
  IS_NEGETIVE_ERROR: 'This field should only contain positive number',
};

export { ERROR_MESSAGES, VALIDATION_ERRORS, ALERT_MESSAGES };
