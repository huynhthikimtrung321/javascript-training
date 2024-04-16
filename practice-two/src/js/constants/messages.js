const ALERT_MESSAGES = {
  ADD_SUCCESS_MSG: 'Product added successfully',
  ADD_FAILED_MSG: 'Adding failed products',
  EDIT_SUCCESS_MSG: 'Product edited successfully',
  EDIT_FAILED_MSG: 'Editing failed products',
  DELETE_SUCCESS_MSG: 'Product deleted successfully',
  DELETE_FAILED_MSG: 'Delete failed products',
};

const VALIDATION_ERRORS = {
  getIsEmptyField: () => 'This field cannot be empty!',
  getUnallowedStringError: () => 'This field should only contain letters and numbers',
  getInvalidSKUError:
    () =>'SKU\'s format: 2 letters, followed by a hyphen, and then 4 numbers like "wl-2444"',
  getNotNumberError: () => 'This field should only contain number',
  getNotIntegerError: () => 'This field should only contain integer',
  getNotPositiveError: () => 'This field should only contain positive number',
  getNotGreaterError: target => `This field must be greater than ${target}!`,
  getNotLesserError: target => `This field must be lesser than ${target}!`,
  getNotEnoughCharacterError: min =>
    `This field should have at least ${min} characters`,
};

export { VALIDATION_ERRORS, ALERT_MESSAGES };
