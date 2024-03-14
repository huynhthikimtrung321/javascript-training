import axios from 'axios';
import { ERROR_MESSAGES } from '../constants/messages';

async function get(endpoint) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`);

    if (!res.ok) {
      throw new Error (ERROR_MESSAGES.GET_FAILED_MSG);
    }

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

async function post(endpoint) {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error (ERROR_MESSAGES.POST_FAILED_MSG);
    }

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

async function edit(endpoint) {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error (ERROR_MESSAGES.EDIT_FAILED_MSG);
    }

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

async function deleted(endpoint) {
  try {
    await axios.delete(`${API_BASE_URL}/${endpoint}`);

    if (!res.ok) {
      throw new Error (ERROR_MESSAGES.DELETE_FAILED_MSG);
    }

    return response.data;

  } catch (error) {
    console.error(error.message);
  }
}

export { get, post, edit, deleted };
