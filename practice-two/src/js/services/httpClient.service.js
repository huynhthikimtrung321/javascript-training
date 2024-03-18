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

  async get(endpoint) {
    try {
      const response = await this.axiosClient.get(`${endpoint}`);

      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }

  async post(endpoint, product) {
    try {
      const response = await this.axiosClient.post(endpoint, products);

      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }

  async patch(endpoint, products) {
    try {
      const response = await this.axiosClient.patch(endpoint, products);

      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }

  async delete (endpoint) {
    try {
      await this.axiosClient.delete(endpoint);

      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
}
