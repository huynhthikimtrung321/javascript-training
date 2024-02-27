const API_BASE_URL = 'http://localhost:3000';

async function handleGet() {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks`);

    if (!res.ok) {
      throw new Error('Posting is failed');
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

export { handleGet}
