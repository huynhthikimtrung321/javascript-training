import 'dotenv/config'

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
    if(task.name === '') {
      throw new Error('The name of task is missing');
    }

    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(task)
    });

    if(!res.ok) {
      throw new Error('Posting is failed');
    }

    const data = res.json();

    return data;
  } catch(error) {
    console.error(error);
  }
}

export {get, post}
