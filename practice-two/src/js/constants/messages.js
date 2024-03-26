const ERROR_MESSAGES = {
  GET_FAILED_MSG: 'Getting data is failed!',
  POST_FAILED_MSG: 'Posting data is failed!',
  EDIT_FAILED_MSG: 'Updating data is failed!',
  DELETE_FAILED_MSG: 'Deleting data is failed!',
};

const VALIDATION_ERRORS = {
  EMPTY_FIELD_ERROR: 'This field cannot be empty!',
  MIN_LENGTH_ERROR: 'This field should has at least 5 characters',
  IS_INVALID_SKU:
    'This SKU is invalid, please only enter 2 aplhabetic characters',
  IS_NAN_ERROR: 'This field should only contain number',
  IS_NOT_INTEGER_ERROR: 'This field should only contain integer',
  IS_NEGETIVE_ERROR: 'This field should only contain positive number',
};

export { ERROR_MESSAGES, VALIDATION_ERRORS };
