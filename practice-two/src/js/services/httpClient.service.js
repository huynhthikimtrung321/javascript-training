import axios from 'axios';

export default class HttpService {
  constructor() {
    this.baseUrl = process.env.BASE_API_URL;
    this.axiosClient = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async get(endpoint, params = {}) {
    const response = await this.axiosClient.get(`${endpoint}`, { params });

    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      throw new Error(`Post Failed: ${response.status}!`);
    }
  }

  async post(endpoint, data) {
    const response = await this.axiosClient.post(endpoint, data);

    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      throw new Error(`Post Failed: ${response.status}!`);
    }
  }

  async put(endpoint, data) {
    const response = await this.axiosClient.put(endpoint, data);

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
