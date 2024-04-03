import axios from 'axios';

export default class HttpService {
  constructor() {
    // eslint-disable-next-line no-undef
    this.baseUrl = process.env.BASE_API_URL;
    this.axiosClient = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async get(endpoint, params = {}) {
    try {
      const response = await this.axiosClient.get(`${endpoint}`, { params });

      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }

  async post(endpoint, product) {
    const response = await this.axiosClient.post(endpoint, product);

    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      throw new Error(`Post Failed: ${response.status}!`);
    }
  }

  async put(endpoint, product) {
    const response = await this.axiosClient.put(endpoint, product);

    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      throw new Error(`Post Failed: ${response.status}!`);
    }
  }

  async delete(endpoint) {
    const response = await this.axiosClient.delete(endpoint);

    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      throw new Error(`Post Failed: ${response.status}!`);
    }
  }
}
