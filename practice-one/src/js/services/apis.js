import { ERROR_MESSAGES } from "../constants/errorMessages";

const { API_BASE_URL } = process.env;

async function get(endpoint) {
  try {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`);

    if (!res.ok) {
      throw new Error(ERROR_MESSAGES.getError);
    }

    const data = await res.json();

    return data;

  } catch (error) {
    console.error(error);
  }
}

async function post(endpoint) {
  try {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(task)
    });

    if(!res.ok) {
      throw new Error(ERROR_MESSAGE.postError);
    }

    const data = res.json();

    return data;
  } catch(error) {
    console.error(error);
  }
}

async function edit(endpoint, task) {
  try {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task)
    });

    if(!res.ok) {
      throw new Error(ERROR_MESSAGES.editError);
    }
    const data = await res.json();

    return data;
  } catch(error) {
    console.error(error);
  }
}

async function deleted(endpoint) {
  try {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'DELETE'
    });

    if(!res.ok) {
      throw new Error(ERROR_MESSAGES.deleteError);
    }
  } catch(error) {
    console.error(error);
  }
}

export {get, post, edit, deleted}
