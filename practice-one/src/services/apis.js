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

    return {
      data
    }
  } catch (error) {
    console.error(error);

    return {
      error
    }
  }
}

export {get}
