import { ERROR_MESSAGES } from '../js/constants/errorMessages';

const { API_BASE_URL } = process.env;

async function get() {
  try {
    const ERROR_MESSAGE = 'Posting is failed';
    const res = await fetch(`${API_BASE_URL}/tasks`);

    if (!res.ok) {
      throw new Error(ERROR_MESSAGE);
    }

    const data = await res.json();

    return data
  } catch (error) {
    console.error(error);

    return {
      error
    }
  }
}

async function post(task) {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(task)
    });

    if(!res.ok) {
      throw new Error(ERROR_MESSAGES.postError);
    }

    const data = res.json();

    return data;
  } catch(error) {
    console.error(error);
  }
}

export {get, post}
