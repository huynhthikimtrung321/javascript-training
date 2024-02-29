const { API_BASE_URL } = process.env;

async function get() {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks`);

    if (!res.ok) {
      throw new Error(ERROR_MESSAGES.getError);
    }

    const data = await res.json();

    return {
      data
    }
  } catch (error) {
    console.error(error);
  }
}

export {get}

