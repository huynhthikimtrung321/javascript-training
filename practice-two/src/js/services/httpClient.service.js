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

  async request(method, endpoint, params) {
    const response = await this.axiosClient[method](endpoint, params);

    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      const methodName = method.charAt(0).toUpperCase() + method.slice(1);
      throw new Error(`${methodName} Failed: ${response.status}!`);
    }
  }

  async get(endpoint, params = {}) {
    return this.request('get', endpoint, params);
  }

  async post(endpoint, params) {
    return this.request('post', endpoint, params);
  }

  async put(endpoint, params) {
    return this.request('put', endpoint, params);
  }

  async delete(endpoint) {
    return this.request('delete', endpoint);
  }
}
