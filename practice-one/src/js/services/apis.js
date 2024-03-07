import { ERROR_MESSAGES } from "../constants/errorMessages";

const { API_BASE_URL } = process.env;

async function getTasks() {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks`);

    if (!res.ok) {
      throw new Error(ERROR_MESSAGES.getError);
    }

    const data = await res.json();

    return data;

  } catch (error) {
    console.error(error);
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
      throw new Error(ERROR_MESSAGE.postError);
    }

    const data = res.json();

    return data;
  } catch(error) {
    console.error(error);
  }
}

async function edit(id, task) {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
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

async function deleted(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE'
    });

    if(!res.ok) {
      throw new Error(ERROR_MESSAGES.deleteError);
    }
  } catch(error) {
    console.error(error);
  }
}

export {getTasks, post, edit, deleted}
